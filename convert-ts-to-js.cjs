const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const rootDir = path.resolve(__dirname, 'src');
const extensions = ['.ts', '.tsx'];
const extToOut = {'.ts': '.js', '.tsx': '.jsx'};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(fullPath));
    } else if (extensions.includes(path.extname(entry.name))) {
      result.push(fullPath);
    }
  }
  return result;
}

const files = walk(rootDir).filter((file) => {
  return !file.endsWith('vite.config.ts');
});
console.log(`Found ${files.length} TS/TSX files to convert.`);

for (const file of files) {
  const ext = path.extname(file);
  const outExt = extToOut[ext];
  const content = fs.readFileSync(file, 'utf8');

  const transformed = esbuild.transformSync(content, {
    loader: ext === '.tsx' ? 'tsx' : 'ts',
    format: 'esm',
    target: ['esnext'],
    sourcefile: file,
    jsx: 'preserve',
  });

  let code = transformed.code;

  code = code.replace(/(['"])([^'"\n]+?)\.(ts|tsx)(['"])/g, (match, quote, value, extName, closingQuote) => {
    const replacementExt = extToOut['.' + extName];
    if (!replacementExt) return match;
    return `${quote}${value}${replacementExt}${closingQuote}`;
  });

  function maybeAddOutputExtension(importPath) {
    if (path.extname(importPath)) return importPath;
    const basedir = path.dirname(file);
    const candidates = ['.tsx', '.ts', '.jsx', '.js'];
    for (const candidateExt of candidates) {
      const candidatePath = path.join(basedir, importPath + candidateExt);
      if (fs.existsSync(candidatePath)) {
        return importPath + (extToOut[candidateExt] || candidateExt);
      }
    }
    const dirPath = path.join(basedir, importPath);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      for (const candidateExt of candidates) {
        const candidatePath = path.join(dirPath, 'index' + candidateExt);
        if (fs.existsSync(candidatePath)) {
          return `${importPath}/index${extToOut[candidateExt] || candidateExt}`;
        }
      }
    }
    return importPath;
  }

  code = code.replace(/(import\s+[\s\S]*?from\s*|export\s+\*\s*from\s*|export\s+.*?from\s*)(['"])(\.\.?\/[^"]+?)(['"])/g,
    (match, prefix, quote, importPath, closingQuote) => {
      const resolved = maybeAddOutputExtension(importPath);
      return `${prefix}${quote}${resolved}${closingQuote}`;
    });

  const outFile = file.slice(0, -ext.length) + outExt;
  fs.writeFileSync(outFile, code, 'utf8');
  fs.unlinkSync(file);
  console.log(`Converted ${path.relative(__dirname, file)} -> ${path.relative(__dirname, outFile)}`);
}
