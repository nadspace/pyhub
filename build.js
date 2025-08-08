const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Build CSS
console.log('Building CSS...');
execSync('npx postcss src/input.css -o dist/output.css', { stdio: 'inherit' });

// Build CSS for production
if (process.env.NODE_ENV === 'production') {
  console.log('Building production CSS...');
  execSync('npx postcss src/input.css -o dist/output.min.css', { stdio: 'inherit' });
}

console.log('Build complete!'); 