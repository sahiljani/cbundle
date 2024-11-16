#!/usr/bin/env node
import minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs-extra';
import { generateDirectoryTree, concatenateFiles } from './dir-utils';
import { displayHelp, displayError, handleExit } from './commands';

// Parse CLI arguments
const args = minimist(process.argv.slice(2), {
  alias: { i: 'include', e: 'exclude', o: 'output', h: 'help' },
  default: { include: [], exclude: [], output: 'output.txt' },
  boolean: ['help', 'verbose']
});

// Normalize includes and excludes to always be arrays
const includes: string[] = Array.isArray(args.include) ? args.include.flat() : [args.include];
const excludes: string[] = Array.isArray(args.exclude) ? args.exclude.flat() : [args.exclude];

// Help flag logic
if (args.help) {
  displayHelp();
  process.exit(0);
}

// Set root directory and output file
const rootDir = args._[0] || '.';
const outputFile = path.resolve(args.output);

try {
  // Generate directory tree and concatenate content
  console.log("Generating directory tree...");
  const directoryTree = generateDirectoryTree(rootDir, includes, excludes);

  console.log("Concatenating file contents...");
  const concatenatedContent = concatenateFiles(rootDir, includes, excludes);

  // Write all content to output file in one step
  const outputContent = `Directory Tree:\n\n${directoryTree}\n\nConcatenated File Contents:\n\n${concatenatedContent}`;
  fs.writeFileSync(outputFile, outputContent, 'utf-8');

  console.log(`Directory structure and files written to ${outputFile}`);
} catch (error) {
  displayError(error);
  handleExit(1);
}
