import { getUsername } from "./get-username.js";
import { processArgs } from "./process-args.js";

let {
    target: { username: inputUsername },
} = await processArgs(["username"]);

inputUsername = typeof inputUsername === "string" ? inputUsername : null;

const username = await getUsername(inputUsername);

process.send(username);
