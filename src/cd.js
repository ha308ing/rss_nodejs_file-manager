import { resolve } from "node:path";
import { access, constants } from "node:fs/promises";

const args = process.argv.slice(2);
if (args.length != 1) throw new TypeError("Must be provided only 1 argument");
const [targetPath] = args;
const target = resolve(targetPath);

access(target, constants.O_DIRECTORY);

process.chdir(target);
process.send(target);
