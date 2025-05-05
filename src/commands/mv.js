import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fork } from "node:child_process";
import { EXIT_CODES } from "../consts.js";

const args = process.argv.slice(2);

if (args.length != 2) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const source = resolve(args[0]);
    const script = resolve(import.meta.dirname, "cp.js");

    const copy = fork(script, args, {
        cwd: process.cwd(),
    });

    copy.on("exit", (code) => {
        if (code === EXIT_CODES.SUCCESS.CODE) {
            rm(source)
                .then(() => {
                    process.exit(EXIT_CODES.SUCCESS.CODE);
                })
                .catch(() => {
                    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
                });
        } else {
            process.exit(code);
        }
    });
} catch {
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
