#!/usr/bin/env node
const { Command } = require('commander');
const { processPath } = require("./core");

const program = new Command();
program
 .command("clean")
 .description("clean the specified file｜指定清理你的文件")
 .action(() => {
   try {
     const filePath = process.cwd();
     processPath(filePath);
   } catch (error) {
     console.error('Error during file cleaning', error.message);
   }
 });

program.version(require("./package.json").version);

program.parse(process.argv);