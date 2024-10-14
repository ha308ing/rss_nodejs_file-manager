import { dirname, resolve, parse } from "node:path";

const args = process.argv.slice(2);
if (args.length > 1) throw new TypeError("Maximum 1 parameter is allowed");

const [depth] = args;
let depthInt = depth == undefined ? 1 : parseInt(depth);
if (depthInt == NaN) throw new Error("Parameter must be a number");

let tempPath = process.cwd();

export const up = async () => {
    let i = depthInt;
    let last = false;

    while (i > 0) {
        tempPath = dirname(tempPath);
        let p = parse(tempPath);
        if (last) break;
        if (p.dir === p.root) last = true;
        i--;
    }
    return tempPath;
};

const newPath = await up();
process.send(newPath);
