import { EOL } from "node:os";
import { Transform } from "node:stream";

export const eolTransfrom = new Transform({
    transform(chunk, _encoding, callback) {
        callback(null, chunk + EOL);
    },
});
