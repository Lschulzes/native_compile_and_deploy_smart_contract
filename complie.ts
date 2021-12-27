import * as path from "path";
import * as fs from "fs";
import { compileSol } from "solc-typed-ast";

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf-8");
console.log(compileSol(source, "auto", []));
