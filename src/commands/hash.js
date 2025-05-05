import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createHash } from "node:crypto";
import { lstat } from "node:fs/promises";
import { EXIT_CODES } from "../consts.js";
import { eolTransfrom } from "./utils/stream-transform-eol.js";

const args = process.argv.slice(2);

if (args.length != 1) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const file = resolve(args[0]);

    const stat = await lstat(file);

    if (!stat.isFile()) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    const readStream = createReadStream(file);

    const hashTransform = createHash("sha256").setEncoding("hex");

    await pipeline(readStream, hashTransform, eolTransfrom, process.stdout);

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
