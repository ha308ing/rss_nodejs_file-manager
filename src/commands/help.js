import { COMMANDS, EXIT_CODES } from "../consts.js";

const args = process.argv.slice(2);

if (args.length > 1) {
    process.exit(EXIT_CODES.INVALID_INPUT.CODE);
}

try {
    const command = args[0] ? args[0].toUpperCase() : "";

    if (command in COMMANDS) {
        console.table({ [command]: COMMANDS[command] });
    } else {
        console.table(COMMANDS);
    }

    process.exit(EXIT_CODES.SUCCESS.CODE);
} catch (e) {
    console.log(e);
    process.exit(EXIT_CODES.OPERATION_FAILED.CODE);
}
