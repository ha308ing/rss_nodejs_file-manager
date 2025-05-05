import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { EXIT_CODES } from "../consts.js";

const [fileName] = process.argv.slice(2);

if (!fileName) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const file = resolve(process.cwd(), fileName);
    const writeOptions = {
        flag: "wx",
    };

    await writeFile(file, "", writeOptions);
    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
