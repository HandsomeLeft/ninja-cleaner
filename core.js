#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { Logger } = require('./logger');

const logger = new Logger();

const strategies = {
  directory: async (filePath) => {
    await processDirectory(filePath);
  },
  file: async (filePath) => {
    await processFile(filePath);
  },
  unknown: () => {
    console.error('无效的文件路径');
  },
};

async function processDirectory(directoryPath) {
  const files = await fs.readdir(directoryPath);
  for (let file of files) {
    let filePath = path.join(directoryPath, file);
    let stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else if (stats.isFile()) {
      await processFile(filePath);
    }
  }
}

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  let logStatements = [];
  content = content.replace(/console\.log\(.*?\);\n?/g, (match) => {
    logStatements.push(match);
    return '';
  });
  await fs.writeFile(filePath, content);
  if (logStatements.length > 0) {
    logger.addLog(filePath, logStatements);
  }
}

async function processPath(filePath) {
  let stats = await fs.stat(filePath);
  let type = 'unknown';
  if (stats.isDirectory()) {
    type = 'directory';
  } else if (stats.isFile()) {
    type = 'file';
  }
  const strategy = strategies[type];
  await strategy(filePath);
  logger.printLogs();
}

module.exports = {
  processPath,
};
