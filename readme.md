# Console Log Cleaner

The Console Log Cleaner is a command-line tool written in Node.js for cleaning up unnecessary `console.log()` statements from your JavaScript files. It recursively processes a specified directory or a single file, removing all instances of `console.log()` and logging the changes made.

## Installation

To use the Console Log Cleaner, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/console-log-cleaner.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd console-log-cleaner
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Make the script executable:**

   ```bash
   chmod +x index.js
   ```

## Usage

```bash
./index.js clean
```

This command cleans the JavaScript files in the current working directory by recursively processing all files and removing console.log() statements. The cleaned files are then saved, and a summary of changes is displayed.

Options -V, --version: Display the version of the Console Log Cleaner.

## Examples

**Clean a Specific Directory**

To clean a specific directory, provide the path to the target directory:

```bash
./index.js clean /path/to/your/directory
./index.js clean /path/to/your/file.js
```

## Logging

The Console Log Cleaner logs the changes made during the cleaning process. The log is displayed after the cleaning is complete, showing the files that were modified and the console.log() statements that were removed.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
