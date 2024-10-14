import { rm } from "node:fs/promises";
import { resolve, basename } from "node:path";
import { cp } from "./cp.js";

const args = process.argv.slice(2);
if (args.length != 2) throw new TypeError("Must be provided 2 parameters");

const source = resolve(args[0]);

export const mv = async () => {
    await cp();
    await rm(source);
};

await mv();
process.send(0);
