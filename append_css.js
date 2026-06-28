const fs = require('fs');
const globalsPath = './src/app/globals.css';
const stylePath = './style.css';

let globals = fs.readFileSync(globalsPath, 'utf8');
let style = fs.readFileSync(stylePath, 'utf8');

// Extract everything from line 121 to end of style.css
const lines = style.split('\n');
const appendContent = '\n\n' + lines.slice(120).join('\n');

// We also need to add the original CSS variables to :root so the appended CSS can use them
const missingVars = `
  --color-bg: #FFFFFF;
  --color-text-primary: #111111;
  --color-text-secondary: #757575;
  --color-accent-gold: #B89970;
  --color-glass-surface: rgba(255, 255, 255, 0.6);
  --color-glass-border: rgba(255, 255, 255, 0.2);
`;

globals = globals.replace(':root {', ':root {' + missingVars);
globals += appendContent;

fs.writeFileSync(globalsPath, globals);
console.log('CSS merged successfully');
