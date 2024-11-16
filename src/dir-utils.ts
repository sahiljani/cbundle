import * as fs from 'fs-extra';
import * as path from 'path';
import { shouldIgnore } from './ignore-utils';

/**
 * Generate a directory tree structure as a string.
 */
export const generateDirectoryTree = (dirPath: string, includes: string[], excludes: string[], verbose = false): string => {
  const getDirTree = (dir: string, level: number = 0): string => {
    const files = fs.readdirSync(dir);
    return files.reduce((tree, file) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);

      if (shouldIgnore(filePath, includes, excludes) && verbose) {
        console.log(`Ignoring: ${filePath}`);
      }

      const indent = ' '.repeat(level * 2);
      tree += fileStat.isDirectory()
        ? `${indent}- ${file}/\n` + getDirTree(filePath, level + 1)
        : `${indent}- ${file}\n`;
      return tree;
    }, '');
  };

  return getDirTree(dirPath);
};

/**
 * Concatenate file contents as a single string.
 */
export const concatenateFiles = (dirPath: string, includes: string[], excludes: string[], verbose = false): string => {
  const concatenate = (dir: string): string => {
    const files = fs.readdirSync(dir);
    return files.reduce((content, file) => {
      const fullPath = path.join(dir, file);
      const fileStat = fs.statSync(fullPath);

      if (shouldIgnore(fullPath, includes, excludes)) {
        if (verbose) console.log(`Ignoring file content: ${fullPath}`);
        return content;
      }

      content += fileStat.isDirectory()
        ? concatenate(fullPath)
        : `\n\n---- File: ${fullPath} ----\n\n${fs.readFileSync(fullPath, 'utf-8')}`;
      return content;
    }, '');
  };

  return concatenate(dirPath);
};
