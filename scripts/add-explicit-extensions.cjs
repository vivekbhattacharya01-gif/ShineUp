const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

const files = walk(root).filter((file) => file.endsWith('.js') || file.endsWith('.jsx'));
let updated = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;
  text = text.replace(/(import\s+(?:[^'"\n]+?\s+from\s*)?|export\s+(?:\*\s*from\s*|[^'"\n]+?\s*from\s*))(['"])(\.\.?\/[^"]+?)(['"])/g,
    (match, prefix, quote, importPath, closingQuote) => {
      if (path.extname(importPath)) return match;
      const basedir = path.dirname(file);
      const candidates = ['.tsx', '.ts', '.jsx', '.js'];
      const outExtMap = {
        '.tsx': '.jsx',
        '.ts': '.js',
        '.jsx': '.jsx',
        '.js': '.js'
      };
      for (const ext of candidates) {
        const candidate = path.join(basedir, importPath + ext);
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          return `${prefix}${quote}${importPath + outExtMap[ext]}${closingQuote}`;
        }
      }
      const indexDir = path.join(basedir, importPath);
      if (fs.existsSync(indexDir) && fs.statSync(indexDir).isDirectory()) {
        for (const ext of candidates) {
          const candidate = path.join(indexDir, `index${ext}`);
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            return `${prefix}${quote}${importPath}/index${outExtMap[ext]}${closingQuote}`;
          }
        }
      }
      return match;
    });
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    updated += 1;
    console.log('Updated', path.relative(process.cwd(), file));
  }
}
console.log('Files updated:', updated);
