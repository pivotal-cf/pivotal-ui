import {execSync} from 'child_process';
import {readdirSync, unlinkSync, readFileSync, writeFileSync} from 'fs';
import path from 'path';
import jsdom from 'jsdom';

import {getResponseAndBody} from '../../support/https';

const validatorPath = path.resolve(__dirname, './validator.py');
const fontDirectory = path.resolve(__dirname, '../../../src/css/typography/fonts');
const fontFiles = readdirSync(fontDirectory).filter(file => file.endsWith('.woff'));
const getHTMLResultsFile = fontFile => `${fontDirectory}/${fontFile.replace('.woff', '_validate.html')}`;

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console, { omitJSDOMErrors: true });

describe('Font WOFF format', () => {
  beforeAll(async () => {
    const {body} = await getResponseAndBody('https://raw.githubusercontent.com/w3c/woff/master/woff1/tools/validator/validator.py');
    writeFileSync(validatorPath, body);
  });

  afterAll(() => {
    fontFiles.forEach(file => {
      unlinkSync(getHTMLResultsFile(file));
    });
    unlinkSync(validatorPath);
  });

  fontFiles.forEach(file => {
    it(`ensures that ${file} is valid`, () => {
      const cmd = `python ${validatorPath} ${fontDirectory}/${file}`;
      execSync(cmd);

      const results = new jsdom.JSDOM(readFileSync(getHTMLResultsFile(file)), { virtualConsole });
      const errors = results.window.document.querySelector('.testReportError .testReportResultCount').textContent;
      expect(errors).toEqual('0');
    });
  });
});