#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { Logger } = require("./logger");

let logger = new Logger();

const strategies = {
  directory: (filePath) => {
    processDirectory(filePath);
  },
  file: (filePath) => {
    processFile(filePath);
  },
  unknown: () => {
    console.error("Invalid file path");
  },
};

function processDirectory(directoryPath) {
  let files = fs.readdirSync(directoryPath);
  for (let file of files) {
    let filePath = path.join(directoryPath, file);
    let stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (stats.isFile()) {
      processFile(filePath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let lines = content.split('\n');
  lines.forEach((line, index) => {
    let match = line.match(/console\.log\(.*?\);\n?/);
    if (match) {
      logger.addLog(filePath, match[0], index + 1);
      lines[index] = line.replace(match[0], '');
    }
  });
  fs.writeFileSync(filePath, lines.join('\n'));
}

function processPath(filePath) {
  let stats = fs.statSync(filePath);
  let type = "unknown";
  if (stats.isDirectory()) {
    type = "directory";
  } else if (stats.isFile()) {
    type = "file";
  }
  const strategy = strategies[type];
  strategy(filePath);
  logger.printLogs();
}

module.exports = {
  processPath,
};
