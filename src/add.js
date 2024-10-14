import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const args = process.argv.slice(2);
if (args.length < 1)
    throw new TypeError("Must be provided at least 1 argument");
if (args.length > 2) throw new TypeError("Maximum number of arguments is 2");

const [inputPath, content] = args;
const path = resolve(inputPath);
const pathDir = resolve(dirname(path));

export const add = async () => {
    try {
        await createFile(path);
    } catch (error) {
        const { code } = error;
        if (code === "ENOENT") {
            try {
                await createDir(pathDir);
                await createFile(path);
            } catch (error) {
                throw new TypeError(`Failed to create file ${path}`);
            }
        } else {
            throw new Error(`Failed to create file ${path}`);
        }
    }
};

async function createDir(path) {
    await mkdir(path, { recursive: true });
}

async function createFile(path) {
    await writeFile(path, content ?? "", {
        flag: "wx",
    });
}

await add();
process.send(0);
