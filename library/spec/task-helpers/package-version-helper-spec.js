import {readArray, writeArray} from 'event-stream';
import path from 'path';

const proxyquire = require('proxyquire').noPreserveCache();

describe('componentsToUpdate', function() {
  let result;

  function getComponentsToUpdate(componentsWithChanges, callback) {
    const {componentsToUpdate} = require('../../tasks/helpers/package-version-helper');
    const componentsToUpdateStream = readArray(componentsWithChanges)
      .pipe(componentsToUpdate());

    componentsToUpdateStream.on('error', (error) => {
      console.error(error);
      callback(error);
    });

    componentsToUpdateStream.pipe(writeArray((err, data) => {
      if (err) console.error(err);
      result = data;
      callback();
    }));
  }

  describe('input: a component with no dependents', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/alerts/'
      ], done);
    });

    it('outputs itself and the root package json only', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/alerts/',
        dependencies: []
      }));
      expect(result.length).toEqual(1);
    });
  });

  describe('input: a component with only react dependents', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/media/'
      ], done);
    });

    it('outputs itself and all dependents', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/media/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/alerts/',
        dependencies: ['pui-react-media']
      }));
      expect(result.length).toEqual(2);
    });
  });

  describe('input: 2 or more components that have a common dependent', () => {
    beforeEach(done => {
      getComponentsToUpdate([
        'src/pivotal-ui-react/dropdowns/',
        'src/pivotal-ui-react/iconography/'
      ], done);
    });

    it('outputs itself and all dependents, no duplicates', () => {
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/dropdowns/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/iconography/',
        dependencies: []
      }));
      expect(result).toContain(jasmine.objectContaining({
        component: 'src/pivotal-ui-react/notifications/',
        dependencies: ['pui-react-dropdowns', 'pui-react-iconography']
      }));
      expect(result.length).toEqual(3);
    });
  });
});

describe('updatePackageJsons', () => {
  let result;
  const version = '1.10.10';

  beforeEach(done => {
    const {componentsToUpdate, updatePackageJsons} = proxyquire('../../tasks/helpers/package-version-helper', {
      './version-helper': {getNewVersion: () => version}
    });

    const updatePackageJsonsStream = readArray(['src/pivotal-ui/components/back-to-top/'])
      .pipe(componentsToUpdate())
      .pipe(updatePackageJsons());

    updatePackageJsonsStream.on('error', (error) => {
      console.error(error);
      callback(error);
    });

    updatePackageJsonsStream.pipe(writeArray((err, data) => {
      if (err) console.error(err);
      result = {};
      for (let file of data) {
        const key = path.relative(process.cwd(), file.path);
        result[key] = JSON.parse(file.contents.toString());
      }
      done();
    }));
  });

  it('updates each package marked to update', () => {
    expect(Object.keys(result).length).toEqual(3);
    expect(Object.keys(result)).toEqual(jasmine.arrayContaining([
      'src/pivotal-ui-react/back-to-top/package.json',
      'src/pivotal-ui/components/back-to-top/package.json',
      'src/pivotal-ui/components/all/package.json'
    ]));
  });

  it("updates each packages' version and the versions of its relevent dependencies", () => {
    expect(result['src/pivotal-ui/components/back-to-top/package.json'].version).toEqual(version);

    expect(result['src/pivotal-ui/components/all/package.json'].version).toEqual(version);
    expect(result['src/pivotal-ui/components/all/package.json'].dependencies['pui-css-back-to-top']).toEqual(`^${version}`);

    expect(result['src/pivotal-ui-react/back-to-top/package.json'].version).toEqual(version);
    expect(result['src/pivotal-ui-react/back-to-top/package.json'].dependencies['pui-css-back-to-top']).toEqual(`^${version}`);
  });
});
