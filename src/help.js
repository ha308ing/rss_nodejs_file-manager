import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { commands } from "./commands.js";
import os from "node:os";

const args = process.argv.slice(2);
if (args.length > 1)
    throw new Error("add must have at most 1 parameter command for help");

const [command] = args;

export const help = async () => {
    if (command in commands) {
        console.table({ [command]: commands[command] });
    } else {
        console.table(commands);
    }
};

help();
