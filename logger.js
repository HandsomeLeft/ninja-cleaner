class Logger {
    constructor() {
      this.logs = {};
    }
  
    addLog(file, statement) {
      if (!this.logs[file]) {
        this.logs[file] = {
          time: new Date().toISOString(),
          statements: []
        };
      }
      this.logs[file].statements.push(statement);
    }
  
    printLogs() {
      for (let file in this.logs) {
        console.log(`File: ${file}`);
        console.log(`Time: ${this.logs[file].time}`);
        console.log(`Removed console.log statements: ${this.logs[file].statements.join(", ")}`);
      }
    }
  }

  module.exports = {
    Logger
  };
  