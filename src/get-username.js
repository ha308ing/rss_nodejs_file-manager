import os from "node:os";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const usernameSystem = os.userInfo().username;
const usernameAnon = "anon";

const regexpNo = /^n$/i;
const regexpYes = /^y$/i;
const regexpUsername = /^\w{3,}$/;

const testAnswer = (answer) => {
    // config format: [[<regexp>, <return if true>]]
    const config = [
        [regexpNo, usernameSystem],
        [regexpYes, usernameAnon],
        [regexpUsername, answer],
    ];

    let result = null;

    for (let [regexp, resultMatch] of config) {
        const isMatch = regexp.test(answer);
        if (isMatch) {
            result = resultMatch;
            break;
        }
    }

    return result;
};

export const getUsername = async (username = null) => {
    return new Promise(async (res) => {
        username = regexpUsername.test(username) ? username : null;

        const rl = readline.createInterface({ input, output });

        rl.on("close", () => {
            if (username === null) username = usernameAnon;
            res(username);
        });

        while (username == null) {
            const answer = await rl.question("Are you anon [Y/N]? ");
            const answerTestResult = testAnswer(answer);
            username = answerTestResult;
        }

        rl.close();

        res(username);
    });
};
