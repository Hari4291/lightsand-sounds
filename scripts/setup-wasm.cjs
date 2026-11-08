const fs = require('fs');
const path = require('path');

// Ensure esbuild uses esbuild-wasm
const esbuildMain = path.join(__dirname, '..', 'node_modules', 'esbuild', 'lib', 'main.js');
if (fs.existsSync(esbuildMain)) {
  fs.writeFileSync(esbuildMain, 'module.exports = require("esbuild-wasm");\n');
}

// Ensure rollup falls back to @rollup/wasm-node/dist/native.js
const rollupNative = path.join(__dirname, '..', 'node_modules', 'rollup', 'dist', 'native.js');
if (fs.existsSync(rollupNative)) {
  let content = fs.readFileSync(rollupNative, 'utf8');
  if (!content.includes("@rollup/wasm-node/dist/native.js")) {
    content = content.replace(
      /const nativeModule = requireWithFriendlyError\([\s\S]*?\);/,
      `let nativeModule;
try {
  nativeModule = requireWithFriendlyError(existsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`);
} catch (e) {
  nativeModule = require('@rollup/wasm-node/dist/native.js');
}`
    );
    fs.writeFileSync(rollupNative, content);
  }
}

// Ensure motion-dom points to valid CJS bundle
const motionDomPkg = path.join(__dirname, '..', 'node_modules', 'motion-dom', 'package.json');
if (fs.existsSync(motionDomPkg)) {
  let pkg = JSON.parse(fs.readFileSync(motionDomPkg, 'utf8'));
  pkg.module = './dist/cjs/index.js';
  if (pkg.exports && pkg.exports['.']) {
    pkg.exports['.'].import = './dist/cjs/index.js';
  }
  fs.writeFileSync(motionDomPkg, JSON.stringify(pkg, null, 2));
}
