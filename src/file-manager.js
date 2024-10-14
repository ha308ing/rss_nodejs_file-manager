import path from "node:path";
import { fork } from "node:child_process";
import os from "node:os";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { commands } from "./commands.js";

const resolve = (inputPath) => path.resolve(import.meta.dirname, inputPath);

const getUsernameModule = resolve("get-username.proc.js");

const commandsModules = Object.keys(commands).reduce((acc, c) => {
    acc[c] = resolve(`${c}.js`);
    return acc;
}, {});

export class FileManager {
    username = null;
    directory = os.homedir();

    async start() {
        this.init();
        this.rl.pause();
        await this.greet();
        this.rl.resume();
    }

    init() {
        const rl = createInterface({
            input,
            output,
            prompt: "$ FileManager: ",
        });

        this.rl = rl;

        rl.on("line", async (line) => {
            const reg = /('[^\']+'|"[^\"]+"|\S+)/g;
            let [command, ...args] = line.match(reg);
            args = args.map((a) => a.replaceAll(/\'|\"/g, ""));

            if (command === ".exit") return rl.close();

            if (command in commandsModules) {
                try {
                    const res = await this.executor(
                        commandsModules[command],
                        args
                    );
                    if (command === "cd" || command === "up") {
                        process.chdir(res);
                        this.directory = res;
                    } else if (res) console.log(res);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error(
                    `Invalid input: command ${command} is unsuppported`
                );
            }
            rl.prompt();
        });

        rl.on("close", () => {
            this.bye();
        });

        process.on("SIGINT", () => {
            rl.close();
        });
    }

    printStatus() {
        console.log(`You are currently in ${this.directory}`);
    }

    async greet() {
        const username = await this.executor(getUsernameModule);
        this.username = username;
        console.log(`Welcome to the File Manager, ${this.username}!`);
    }

    async handleCommands() {}

    bye() {
        console.log(
            `Thank you for using File Manager, ${this.username}, goodbye!`
        );
    }

    async printStatus() {
        console.log(`You are currently in ${this.directory}`);
    }

    async executor(what, args = process.argv.slice(2)) {
        return new Promise((res, rej) => {
            const child = fork(what, args, {
                stdio: [0, 1, "pipe", "ipc"],
                cwd: this.directory,
            });

            child.on("message", (message) => {
                res(message);
            });

            child.on("close", () => {
                this.printStatus();
                this.rl.resume();
                this.rl.prompt();
            });

            child.stderr.setEncoding("utf-8").on("data", (data) => {
                const isInputError = data.includes("TypeError");
                if (isInputError) rej("Invalid input");
                else rej("Operation failed");
            });
        });
    }
}

export const fileManager = new FileManager();
