import {map, pipeline} from 'event-stream';
import gulp from 'gulp';
import path from 'path';

import {getNewVersion} from './version-helper';

export function releaseDest(folderName='') {
  const prefixReleaseToDestStream = map(async (file, callback) => {
    try {
      const version = getNewVersion();
      if (file.path.indexOf(`pui-v${version}`) === -1) {
        file.path = path.join(file.base, `pui-v${version}`, folderName, file.relative);
      }
      callback(null, file);
    }
    catch(e) {
      console.error(error.stack);
      callback(e);
    }
  });

  return pipeline(
    prefixReleaseToDestStream,
    gulp.dest('release/')
  );
}
