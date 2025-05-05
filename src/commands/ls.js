import { readdir, lstat } from "node:fs/promises";
import { EXIT_CODES } from "../consts.js";

const path = process.cwd();

try {
    const stat = await lstat(path);

    if (!stat.isDirectory()) {
        process.exit(EXIT_CODES.INVALID_INPUT.CODE);
    }

    await ls();

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}

export async function ls() {
    const list = await readdir(path, { withFileTypes: true });
    const table = list.map(formatItem).sort(sortItems);

    if (table.length === 0) {
        console.log(`Directory is empty`);
    } else {
        console.log(`Content of ${path}:`);
        console.table(table);
    }
    return;
}

function sortItems(a, b) {
    if (a.Type == b.Type) {
        return 0;
    } else if (a.Type == "directory") {
        return -1;
    } else {
        return 1;
    }
}

function formatItem(item) {
    return {
        Name: item.name,
        Type: getType(item),
    };
}

function getType(item) {
    return item.isDirectory()
        ? "directory"
        : item.isFile()
        ? "file"
        : item.isSymbolicLink()
        ? "symbolic link"
        : item.isBlockDevice()
        ? "block device"
        : item.isCharacterDevice()
        ? "character device"
        : item.isFIFO()
        ? "fifo"
        : item.isSocket()
        ? "socket"
        : "unknown";
}
