# CodeBundle: Code Unification Made Simple

**CodeBundle** is an intuitive CLI tool for developers who want to package an entire codebase into a single, organized text file. Ideal for code sharing, review, documentation, or preparing input for large language models (LLMs) like ChatGPT, CodeBundle automatically consolidates directories and files into a structured output that maintains both an organized file tree and content structure.

## Key Features

- **Automatic Directory Structure**: Generates a structured outline of all files and directories in the project.
- **Concatenation of Files**: Merges file contents into a single text file, with clear boundary markers for each file, making the project accessible as one organized unit.
- **Selective Inclusion and Exclusion**: Allows specific file patterns to be included or excluded, ensuring that only essential files are bundled together.
- **Binary File Detection**: Automatically skips binary files and other unwanted file types, keeping the output relevant for text-based review.

## Installation

Install CodeBundle globally to use it as a CLI tool:

```bash
npm install -g cbundle
```

## CLI Usage

Run `cbundle` from the root of your project directory to generate a structured text file that consolidates the entire codebase:

```bash
cbundle [options] <directory>
```

### Options

| Option          | Description                           |
|-----------------|---------------------------------------|
| `-i, --include` | Specify patterns to include           |
| `-e, --exclude` | Specify patterns to exclude           |
| `-o, --output`  | Set output file path (default: output.txt) |
| `-h, --help`    | Show help message                     |
| `--verbose`     | Enable detailed logs                  |

## Example Usage

Navigate to your project’s root and run CodeBundle to create a single, organized file:

```bash
cbundle -i src -e dist -o codebundle_output.txt
```

This command:

- Includes all files in the `src` directory.
- Excludes the `dist` directory.
- Outputs the concatenated result to `codebundle_output.txt`.

## Use Case Scenarios

- **Code Review**: Package an entire project into one file, making it easier for reviewers to assess code structure and contents.
- **Documentation**: Generate a single file that shows a snapshot of the entire codebase, useful for documentation or archives.
- **LLM Interaction**: Prepare codebases in a structured way for input to LLMs, aiding in review and query responses.

## Example Output Structure

### Directory Tree:

```
- src/
  - index.ts
  - utils.ts
- package.json
- README.md
```

### Concatenated File Contents:

```
---- File: src/index.ts ----

<Contents of src/index.ts>

---- File: src/utils.ts ----

<Contents of src/utils.ts>

---- File: package.json ----

<Contents of package.json>

---- File: README.md ----

<Contents of README.md>
```

CodeBundle combines all relevant files into one output file, making it easy to navigate and review as a unified document.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you have any questions or run into any issues, feel free to reach out by opening an issue in the GitHub repository.

Happy bundling!
