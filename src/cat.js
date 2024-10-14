import { createReadStream } from "node:fs";
import { access, constants, lstat } from "node:fs/promises";
import { resolve } from "node:path";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { EOL } from "node:os";

const args = process.argv.slice(2);
if (args.length != 1) throw new TypeError("Must be provided 1 argument");

const path = resolve(args[0]);
const stat = await lstat(path);
if (!stat.isFile()) throw new TypeError("Argument should be a file");

try {
    await access(path, constants.R_OK);
} catch (error) {
    throw new TypeError("Can't read the file");
}

pipeline(
    createReadStream(path),
    new Transform({
        transform(chunk) {
            this.push(chunk + EOL);
        },
    }),
    process.stdout
);
process.send(0);
