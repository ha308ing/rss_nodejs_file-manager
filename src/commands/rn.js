import { rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { EXIT_CODES } from "../exit-codes.js";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const [file, name] = args;
    const path = resolve(file);
    const dir = dirname(path);
    const pathNew = resolve(dir, name);

    await rename(path, pathNew);

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
