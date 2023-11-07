#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const { processPath } = require("./core");

program
  .command('', 'Default command', {isDefault: true})
  .action(() => {
    console.log("A code cleaner built with JavaScript");
  });

program
  .command("clean")
  .description("clean the specified file｜指定清理你的文件")
  .action(() => {
    let filePath = process.cwd();
    filePath = path.resolve(filePath);
    processPath(filePath);
  });

program.version(require("./package.json").version);

program.parse(process.argv);
