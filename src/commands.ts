export function displayHelp(): void {
    console.log(`
      Usage: cbundle [options] <directory>
      Options:
        -i, --include     Patterns to include
        -e, --exclude     Patterns to exclude
        -o, --output      Output file path (default: output.txt)
        -h, --help        Show this help message
        --verbose         Show additional logs
    `);
  }
  
  export function displayError(error: any): void {
    console.error("An error occurred:", error.message || error);
  }
  
  export function handleExit(code: number): void {
    console.log("Exiting with code", code);
    process.exit(code);
  }
  