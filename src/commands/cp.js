import { createReadStream, createWriteStream } from "node:fs";
import { resolve, basename } from "node:path";
import { pipeline } from "node:stream/promises";
import { EXIT_CODES } from "../consts.js";
import { lstat } from "node:fs/promises";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const [source, target] = args;

    const pathSource = resolve(source);

    const file = basename(pathSource);

    const pathTarget = resolve(target, file);

    const targetStat = await lstat(target);

    if (!targetStat.isDirectory()) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    await pipeline(
        createReadStream(pathSource),
        createWriteStream(pathTarget, { flags: "ax" })
    );

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
