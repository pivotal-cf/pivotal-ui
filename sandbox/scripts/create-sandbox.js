const fs = require('fs');
const path = require('path');

const sandboxFilePath = path.resolve(__dirname, '../sandbox.js');

const sandboxStarterContent = `
import React from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default () => {
  return <DefaultButton>Hello!</DefaultButton>
};
`.trim();

if (fs.existsSync(sandboxFilePath)) {
  console.log('Your sandbox.js file already exists!\n\nUse "yarn start" to start the dev server.');
  process.exit();
} else {
  console.log('Creating "sandbox.js" file...');
}

fs.writeFileSync(sandboxFilePath, sandboxStarterContent);

console.log('Wrote "sandbox.js"!\n\nUse "yarn start" to start the dev server.');
