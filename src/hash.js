import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createHash } from "node:crypto";
import { EOL } from "node:os";
import { Transform } from "node:stream";
import { lstat } from "node:fs/promises";

const args = process.argv.slice(2);
if (args.length != 1) throw new TypeError("Must be provided 1 parameter");

const file = resolve(args[0]);

const stat = await lstat(file);
if (!stat.isFile()) throw new TypeError("Input path must be a file");

const hashObj = createHash("sha256");
let hashResult = null;

const streamTransform = new Transform({
    transform(chunk) {
        hashObj.update(chunk);
        hashResult = hashObj.digest("hex");
        this.push(hashResult + EOL);
    },
});

pipeline(createReadStream(file), streamTransform, process.stdout);
process.send(hashResult);
