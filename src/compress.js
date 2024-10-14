import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";

const args = process.argv.slice(2);
if (args.length > 2) throw new Error("Must be provided 2 parameters");

const [file, targetPath] = args;
const filePath = resolve(file);

const stats = await stat(file);
if (!stats.isFile()) throw new TypeError("Input path must be a file");

const filename = basename(filePath);
const zipPath = join(
    targetPath ? resolve(targetPath) : dirname(filePath),
    filename + ".br"
);

pipeline(
    createReadStream(filePath),
    createBrotliCompress(),
    createWriteStream(zipPath)
);
process.send(0);
