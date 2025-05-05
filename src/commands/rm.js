import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { EXIT_CODES } from "../exit-codes.js";

const args = process.argv.slice(2);

if (args.length != 1) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const file = resolve(args[0]);

    await rm(file, { recursive: true });

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
