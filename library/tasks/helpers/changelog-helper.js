export function commitTransform(commit) {
  if (commit.type === 'feat') {
    commit.type = 'Features';
  } else if (commit.type === 'fix') {
    commit.type = 'Bug Fixes';
  } else {
    return null;
  }

  if (typeof commit.hash === 'string') {
    commit.hash = commit.hash.substring(0, 7);
  }

  if (typeof commit.subject === 'string') {
    commit.subject = commit.subject.substring(0, 80);
  }

  const commitUrl = `([${commit.hash}](https://github.com/pivotal-cf/pivotal-ui/commits/${commit.hash}))`;

  commit.notes.map(note => {
    if (note.title === 'BREAKING CHANGE' || note.title === 'DEPRECATION WARNING') {
      note.title += 'S';
      note.text = `**${commit.scope}:** ${note.text.trim()} ${commitUrl}`;
    }

    return note;
  });

  return commit;
}
