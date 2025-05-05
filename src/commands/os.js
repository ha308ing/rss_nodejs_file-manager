import { arch } from "node:process";
import { EXIT_CODES } from "../consts.js";
import { EOL, cpus, homedir, userInfo } from "node:os";

const args = process.argv.slice(2);

if (args.length !== 1) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

const [arg] = args;

if (arg === "--EOL") {
    const eolString = EOL.replaceAll("\n", "\\n").replaceAll("\r", "\\r");
    console.log(`OS EOL: ${eolString}`);
    process.exit(EXIT_CODES.SUCCESS.CODE);
}

if (arg === "--cpus") {
    const res = cpus();
    const count = res.length;
    const cpusInfo = res
        .map(
            ({ model, speed }, index) =>
                `${index + 1}. Model: ${model}@${speed}GHz`
        )
        .join(EOL);

    console.log(`Total CPU count: ${count}${EOL}${cpusInfo}`);
    process.exit(EXIT_CODES.SUCCESS.CODE);
}

if (arg === "--homedir") {
    console.log(`OS Homedir: ${homedir()}`);
    process.exit(EXIT_CODES.SUCCESS.CODE);
}

if (arg === "--username") {
    console.log(`OS username: ${userInfo().username}`);
    process.exit(EXIT_CODES.SUCCESS.CODE);
}

if (arg === "--architecture") {
    console.log(`OS architecture: ${arch}`);
    process.exit(EXIT_CODES.SUCCESS.CODE);
}

process.exit(EXIT_CODES.INVALID_INPUT.CODE);
