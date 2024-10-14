import { processArgs } from "./process-args.js";

const args = await processArgs();

process.send(args);
