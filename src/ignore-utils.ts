import * as path from 'path';
import * as fs from 'fs-extra';
import ignore, { Ignore } from 'ignore';

// List of binary file extensions directly in the code
const binaryExtensions: string[] = [
    "3dm", "3ds", "3g2", "3gp", "7z", "a", "aac", "adp", "afdesign", "afphoto", "afpub", "ai",
    "aif", "aiff", "alz", "ape", "apk", "appimage", "ar", "arj", "asf", "au", "avi", "bak",
    "baml", "bh", "bin", "bk", "bmp", "btif", "bz2", "bzip2", "cab", "caf", "cgm", "class",
    "cmx", "cpio", "cr2", "cur", "dat", "dcm", "deb", "dex", "djvu", "dll", "dmg", "dng",
    "doc", "docm", "docx", "dot", "dotm", "dra", "DS_Store", "dsk", "dts", "dtshd", "dvb",
    "dwg", "dxf", "ecelp4800", "ecelp7470", "ecelp9600", "egg", "eol", "eot", "epub", "exe",
    "f4v", "fbs", "fh", "fla", "flac", "flatpak", "fli", "flv", "fpx", "fst", "fvt", "g3",
    "gh", "gif", "graffle", "gz", "gzip", "h261", "h263", "h264", "icns", "ico", "ief", "img",
    "ipa", "iso", "jar", "jpeg", "jpg", "jpgv", "jpm", "jxr", "key", "ktx", "lha", "lib",
    "lvp", "lz", "lzh", "lzma", "lzo", "m3u", "m4a", "m4v", "mar", "mdi", "mht", "mid", "midi",
    "mj2", "mka", "mkv", "mmr", "mng", "mobi", "mov", "movie", "mp3", "mp4", "mp4a", "mpeg",
    "mpg", "mpga", "mxu", "nef", "npx", "numbers", "nupkg", "o", "odp", "ods", "odt", "oga",
    "ogg", "ogv", "otf", "ott", "pages", "pbm", "pcx", "pdb", "pdf", "pea", "pgm", "pic", "png",
    "pnm", "pot", "potm", "potx", "ppa", "ppam", "ppm", "pps", "ppsm", "ppsx", "ppt", "pptm",
    "pptx", "psd", "pya", "pyc", "pyo", "pyv", "qt", "rar", "ras", "raw", "resources", "rgb",
    "rip", "rlc", "rmf", "rmvb", "rpm", "rtf", "rz", "s3m", "s7z", "scpt", "sgi", "shar",
    "snap", "sil", "sketch", "slk", "smv", "snk", "so", "stl", "suo", "sub", "swf", "tar",
    "tbz", "tbz2", "tga", "tgz", "thmx", "tif", "tiff", "tlz", "ttc", "ttf", "txz", "udf",
    "uvh", "uvi", "uvm", "uvp", "uvs", "uvu", "viv", "vob", "war", "wav", "wax", "wbmp", "wdp",
    "weba", "webm", "webp", "whl", "wim", "wm", "wma", "wmv", "wmx", "woff", "woff2", "wrm",
    "wvx", "xbm", "xif", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsx", "xlt", "xltm", "xltx",
    "xm", "xmind", "xpi", "xpm", "xwd", "xz", "z", "zip", "zipx"
];

// Load and parse .gitignore in each directory path, using `ignore` library for pattern matching
const loadGitignoreRules = (dirPath: string): Ignore => {
  const ignoreInstance = ignore();
  const gitignorePath = path.join(dirPath, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ignoreInstance.add(gitignoreContent.split('\n'));
  }
  return ignoreInstance;
};

/**
 * Check if a file should be ignored based on .gitignore rules, custom patterns, and file type.
 * @param filePath - Path of the file to check
 * @param includes - Patterns to include
 * @param excludes - Patterns to exclude
 * @returns True if file should be ignored, false otherwise
 */
export const shouldIgnore = (filePath: string, includes: string[], excludes: string[]): boolean => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const dirPath = path.dirname(filePath);
  const ignoreInstance = loadGitignoreRules(dirPath);

  // Check if file matches exclude patterns
  if (excludes.some(pattern => filePath.includes(pattern))) return true;

  // Check if file matches include patterns
  if (includes.some(pattern => filePath.includes(pattern))) return false;

  // Check if file is ignored based on .gitignore rules
  const relativePath = path.relative(dirPath, filePath);
  if (ignoreInstance.ignores(relativePath)) return true;

  // Check if file is binary based on extension
  return binaryExtensions.includes(ext);
};
