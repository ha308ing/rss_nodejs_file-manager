import { createReadStream, createWriteStream } from "node:fs";
import { resolve, basename } from "node:path";
import { pipeline } from "node:stream/promises";

const args = process.argv.slice(2);
if (args.length != 2) throw new TypeError("Must be provided 2 parameters");
const [source, target] = args;
const pathSource = resolve(source);
const file = basename(pathSource);
const pathTarget = resolve(target, file);

export const cp = async () => {
    return await pipeline(
        createReadStream(pathSource),
        createWriteStream(pathTarget)
    );
};

await cp();
process.send(0);
