import osNode from "node:os";

const args = process.argv.slice(2);
if (args.length != 1) throw new TypeError("Provide one a flag");
const paramInput = args[0];

export const os = async () => {
    const param = calibrate(paramInput);
    if (!(param in osNode))
        throw new TypeError(`os: failed to get ${param} property`);
    const osInfo = osNode[param];
    const result = typeof osInfo == "function" ? osInfo() : osInfo;

    return param === "userInfo" ? result.username : result;
};

const calibrator = {
    username: "userInfo",
    architecture: "arch",
    eol: "EOL",
};
function calibrate(param) {
    param = param.startsWith("--") ? param.slice(2) : param;
    if (param in calibrator) return calibrator[param];
    return param;
}

const res = await os();
process.send(res);
