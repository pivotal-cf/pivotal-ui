import {readArray, writeArray} from 'event-stream';
import path from 'path';
import File from 'vinyl';
import {packageJson} from '../../tasks/helpers/react-components-helper';

describe('packageJson', () => {
  let result;

  const generatePackageJson = (name, packageJsonOverrides, callback) => {
    const readmeStream = readArray([new File({
      path: path.join(__dirname, '..', '..', 'src', 'pivotal-ui-react', name, 'package.json'),
      contents: new Buffer(JSON.stringify(packageJsonOverrides, null, 2))
    })]).pipe(packageJson());

    readmeStream.on('error', (error) => {
      console.error(error);
      callback();
    });

    readmeStream.pipe(writeArray((error, data) => {
      result = data;
      callback();
    }));
  };

  describe('with no overrides', function() {
    beforeEach(done => generatePackageJson('foo', {}, done));

    it('returns a package json file with default values', function() {
      expect(result[0].path).toEqual('foo/package.json');

      const jsonContents = JSON.parse(result[0].contents.toString());
      expect(jsonContents).toEqual(jasmine.objectContaining({
        name: 'pui-react-foo',
        version: '0.0.1',
        description: 'foo',
        main: 'foo.js',
        repository: {type: 'git', url: 'https://github.com/pivotal-cf/pivotal-ui.git'},
        keywords: ['bootstrap', 'react', 'pivotal ui', 'pivotal ui modularized'],
        author: 'Pivotal Software, Inc',
        license: 'MIT',
        bugs: {url: 'https://github.com/pivotal-cf/pivotal-ui/issues'},
        homepage: 'https://github.com/pivotal-cf/pivotal-ui',
        peerDependencies: { react: '>=15.0.0' }
      }));
    });

    it('does not have a style attribute', function() {
      const jsonContents = JSON.parse(result[0].contents.toString());
      expect(jsonContents.style).toBeUndefined();
    });
  });

  describe('with some overrides', function() {
    beforeEach(done => generatePackageJson('foo', {
      description: 'custom description',
      version: '1.2.3',
      dependencies: {
        'foo': '1.0.0',
        'bar': '2.0.0'
      }
    }, done));

    it('returns a package json file with the override values', function() {
      expect(JSON.parse(result[0].contents.toString())).toEqual(jasmine.objectContaining({
        description: 'custom description',
        version: '1.2.3',
        dependencies: {
          'babel-runtime': '^6.1.18',
          'foo': '1.0.0',
          'bar': '2.0.0'
        }
      }));
    });
  });
});
