import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
if (args.length != 1) throw new TypeError("Must be provided 1 parameters");

const file = resolve(args[0]);

await rm(file, { recursive: true });
process.send(0);
