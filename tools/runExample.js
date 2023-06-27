const { fork } = require("child_process");
const fs = require("fs");
const path = require("path");

const exampleId = process.argv[2];

if(!exampleId)
    return console.error("example id must provide");

const scriptPath = path.join(__dirname, "../", `dist/examples/${exampleId}/index.js`);

if(!fs.existsSync(scriptPath))
    return console.error(`example ${exampleId} not found`);

const child = fork(scriptPath);
child.on("exit", () => console.log(`example ${exampleId} execution complete`));