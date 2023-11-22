class Logger {
  constructor() {
    this.logs = {};
  }

  addLog(file, statement, lineNumber) {
    if (!this.logs[file]) {
      this.logs[file] = {
        time: new Date().toISOString(),
        statements: [],
      };
    }
    this.logs[file].statements.push({ statement, lineNumber });
  }

  printLogs() {
    for (let file in this.logs) {
      console.log(`File: ${file}`);
      console.log(`Time: ${this.logs[file].time}`);
      this.logs[file].statements.forEach(log => {
        console.log("%cRemoved console.log statement: " + log.statement, "color: red");
        console.log("%cLine number: " + log.lineNumber, "color: blue");
      });
    }
  }
}
module.exports = {
  Logger
};
