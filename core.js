#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
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
  content = content.replace(/console\.log\(.*?\);?/g, "");
  fs.writeFileSync(filePath, content);
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
}

//导出
module.exports = {
  processPath,
};
