const fs = require('fs');

class EnhancedLogger extends Logger {
  constructor() {
    super();
    this.errorLogs = {};
  }

  addErrorLog(file, errorMessage) {
    if (!this.errorLogs[file]) {
      this.errorLogs[file] = {
        time: new Date().toISOString(),
        errorMessages: []
      };
    }
    this.errorLogs[file].errorMessages.push(errorMessage);
  }

  exportLogs(filePath) {
    const allLogs = {
      standardLogs: this.logs,
      errorLogs: this.errorLogs
    };
    fs.writeFileSync(filePath, JSON.stringify(allLogs, null, 2));
  }

  printErrorLogs() {
    for (let file in this.errorLogs) {
      console.log(`File: ${file}`);
      console.log(`Time: ${this.errorLogs[file].time}`);
      console.log(`Error Messages: ${this.errorLogs[file].errorMessages.join(", ")}`);
    }
  }

  filterLogsByType(type) {
    return type === 'error' ? this.errorLogs : this.logs;
  }

  filterLogsByDate(startDate, endDate) {
    const filteredLogs = {};
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let file in this.logs) {
      const logTime = new Date(this.logs[file].time);
      if (logTime >= start && logTime <= end) {
        filteredLogs[file] = this.logs[file];
      }
    }
    return filteredLogs;
  }
}

module.exports = {
  EnhancedLogger
};