import { EOL, userInfo, homedir } from "node:os";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, resolve } from "node:path";
import { fork } from "node:child_process";
import { EXIT_CODES, COMMANDS_DIR, COMMANDS } from "./consts.js";

process.chdir(homedir());

const username =
    process.argv[2]?.replace("--username=", "") ?? userInfo().username;

console.log(`Welcome to the File Manager, ${username}!`);

process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

const readline = createInterface({ input, output });

loop();

readline.on("SIGINT", () => {
    process.exit();
});

async function loop() {
    const answer = await readline.question(
        `You are currently in ${process.cwd()}${EOL}`
    );

    const { command, args } = parseAnswer(answer);

    if (command === null) {
        return loop();
    }

    if (command === COMMANDS.EXIT.command) {
        process.exit();
    }

    if (command === COMMANDS.UP.command) {
        const parentDirectory = dirname(process.cwd());
        process.chdir(parentDirectory);
        return loop();
    }

    if (command === COMMANDS.CD.command) {
        try {
            if (args.length < 1) {
                console.error(EXIT_CODES.INVALID_INPUT.MESSAGE);
                return loop();
            }
            const path = resolve(process.cwd(), args[0]);

            process.chdir(path);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log(EXIT_CODES.INVALID_INPUT.MESSAGE);
            } else {
                console.error(EXIT_CODES.OPERATION_FAILED.MESSAGE);
            }
            return loop();
        }
        return loop();
    }

    const script = resolve(
        import.meta.dirname,
        `${COMMANDS_DIR}/${command}.js`
    );

    const child = fork(script, args, { cwd: process.cwd() });

    child.on("exit", (code) => {
        switch (code) {
            case EXIT_CODES.INVALID_INPUT.CODE: {
                console.error(EXIT_CODES.INVALID_INPUT.MESSAGE);
                break;
            }
            case EXIT_CODES.OPERATION_FAILED.CODE: {
                console.error(EXIT_CODES.OPERATION_FAILED.MESSAGE);
                break;
            }
        }

        loop();
    });
}

const answerRegexp = /^(?<command>\.?\w+)(?<args>.*)$/i;

function parseAnswer(answer) {
    const match = answer.match(answerRegexp);

    if (!match) {
        return {
            command: null,
            args: null,
        };
    }

    let {
        groups: { command, args },
    } = match;
    args = args ? args.trim().split(" ") : [];

    return { command, args };
}
