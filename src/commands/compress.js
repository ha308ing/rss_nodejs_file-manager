import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { resolve, basename, join, dirname } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createGzip } from "node:zlib";
import { EXIT_CODES } from "../consts.js";
import { EOL } from "node:os";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const [source, target] = args;
    const filePath = resolve(source);
    const targetPath = resolve(target);

    const fileStats = await lstat(filePath);
    const targetStats = await lstat(targetPath);

    if (!fileStats.isFile() || !targetStats.isDirectory()) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    const filename = basename(filePath);
    const zipPath = join(dirname(filePath), filename + ".br");

    await pipeline(
        createReadStream(filePath),
        createBrotliCompress(),
        createWriteStream(zipPath)
    );

    console.log(`Compressed file ${filePath}${EOL}to ${zipPath}`);

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
