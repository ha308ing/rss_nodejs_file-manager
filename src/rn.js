import { rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);

if (args.length != 2) throw new TypeError("Must be provided 2 parameters");

const [file, name] = args;
const path = resolve(file);
const dir = dirname(path);
const pathNew = resolve(dir, name);

await rename(path, pathNew);
process.send(0);
