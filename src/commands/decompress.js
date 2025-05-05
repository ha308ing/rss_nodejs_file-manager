import { createReadStream, createWriteStream } from "node:fs";
import { lstat } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import { EXIT_CODES } from "../consts.js";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const [source, target] = args;
    const filePath = resolve(source);
    const targetPath = resolve(target);
    const zipExtension = ".br";
    const fileExt = extname(filePath);

    const fileStats = await lstat(filePath);
    const targetStats = await lstat(targetPath);

    if (
        !fileStats.isFile() ||
        !targetStats.isDirectory() ||
        fileExt != zipExtension
    ) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    const unzipPath = join(targetPath, basename(filePath, zipExtension));

    await pipeline(
        createReadStream(filePath),
        createBrotliDecompress(),
        createWriteStream(unzipPath)
    );

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
