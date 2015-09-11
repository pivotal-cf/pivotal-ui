import {getTagFromTagString, isBlank, getPathsFromDiff} from '../../tasks/helpers/git-helper';

const outputFromGit = `   3.0% src/pivotal-ui-react/buttons/
      3.0% src/pivotal-ui-react/collapse/
      3.0% src/pivotal-ui-react/dividers/
      3.0% src/pivotal-ui-react/draggable-list/   `;

describe('getTagFromTagString', function() {
  it('removes the garbage at the end', function() {
    expect(
      getTagFromTagString('v2.0.0-alpha.4-7-gc936d0b')
    ).toEqual('v2.0.0-alpha.4');
  });
});

describe('isBlank', function() {
  it('checks if a string is blank', function() {
    expect(isBlank('    ')).toBe(true);
    expect(isBlank('  adf  asdf  ')).toBe(false);
  });
});

describe('getPathsFromDiff', function() {
  it('extracts the paths from a string', function() {
    expect(getPathsFromDiff(outputFromGit)).toEqual([
      'src/pivotal-ui-react/buttons/',
      'src/pivotal-ui-react/collapse/',
      'src/pivotal-ui-react/dividers/',
      'src/pivotal-ui-react/draggable-list/'
    ]);
  });
});
