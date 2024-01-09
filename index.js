#!/usr/bin/env node
const { Command } = require('commander');
const { processPath } = require("./core");

const program = new Command();
program
 .command("clean")
 .description("clean the specified file｜指定清理你的文件")
 .action(() => {
   const filePath = process.cwd(); // 直接使用 process.cwd() 获取当前工作目录
   processPath(filePath);
 });

program.version(require("./package.json").version);

program.parse(process.argv);