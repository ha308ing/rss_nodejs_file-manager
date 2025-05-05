import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { EXIT_CODES } from "../consts.js";

const [inputPath] = process.argv.slice(2);

if (!inputPath) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const path = resolve(process.cwd(), inputPath);

    await mkdir(path);

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
