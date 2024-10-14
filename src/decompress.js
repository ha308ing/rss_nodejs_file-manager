import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

const args = process.argv.slice(2);
if (args.length > 2) throw new Error("Must be provided 2 parameters");

const [file, targetPath] = args;
const filePath = resolve(file);
const zipExtension = ".br";
const fileExt = extname(filePath);

const stats = await stat(filePath);
if (!stats.isFile()) throw new TypeError("Input path must be a file");

if (fileExt != zipExtension)
    throw new TypeError(`Input path must have ${zipExtension} extension`);

const unzipPath = join(
    targetPath ? resolve(targetPath) : dirname(filePath),
    basename(filePath, zipExtension)
);

pipeline(
    createReadStream(filePath),
    createBrotliDecompress(),
    createWriteStream(unzipPath)
);
process.send(0);
