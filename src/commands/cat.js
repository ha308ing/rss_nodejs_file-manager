import { createReadStream } from "node:fs";
import { access, constants, lstat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { EXIT_CODES } from "../consts.js";
import { eolTransfrom } from "./utils/stream-transform-eol.js";

const args = process.argv.slice(2);

if (args.length != 1) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const [path] = args;
    const stat = await lstat(path);

    if (!stat.isFile()) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    await access(path, constants.R_OK);

    await pipeline(createReadStream(path), eolTransfrom, process.stdout);

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
