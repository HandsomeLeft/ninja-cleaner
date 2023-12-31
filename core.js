#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { Logger } = require("./logger");

const logger = new Logger();

const strategies = {
  directory: (filePath) => {
    processDirectory(filePath);
  },
  file: (filePath) => {
    processFile(filePath);
  },
  unknown: () => {
    console.error("无效的文件路径");
  },
};


function processDirectory(directoryPath) {
  for (let file of fs.readdirSync(directoryPath)) {
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
  let logStatements = [];
  content = content.replace(/console\.log\(.*?\);\n?/g, (match) => {
    logStatements.push(match);
    return "";
  });
  fs.writeFileSync(filePath, content);
  if (logStatements.length > 0) {
    logger.addLog(filePath, logStatements);
  }
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
