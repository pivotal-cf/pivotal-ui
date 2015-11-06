import fs from 'fs';
import {map} from 'event-stream';
import path from 'path';
import File from 'vinyl';

export default function license() {
  const licenseContents = fs.readFileSync('templates/MIT_LICENSE');

  return map((folder, callback) => {
    const componentName = path.basename(folder.path);
    callback(null, new File({
      path: path.join(componentName, 'LICENSE'),
      contents: licenseContents
    }));
  });
}
