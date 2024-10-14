import { readdir, lstat } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
if (args.length > 1) throw new TypeError("Maximum number of parameters is 1");

const pathInput = args[0] ?? process.cwd();
const path = resolve(pathInput);

const stat = await lstat(path);
if (!stat.isDirectory()) throw new TypeError("Input path must be a directory");

export const ls = async () => {
    const list = await readdir(path, { withFileTypes: true });
    const table = list.map(formatItem).sort(sortItems);
    console.log(`Content of ${path}:`);
    console.table(table);
    return;
};

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

ls();
