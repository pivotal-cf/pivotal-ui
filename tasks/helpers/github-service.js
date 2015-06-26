import axios from 'axios';
import promisify from 'es6-promisify';

export async function addReleaseNotesToLatest(versionChanges) {
  const tagName = `v${require('../../package.json').version}`;
  const releaseId = (await axios.get(`https://api.github.com/repos/pivotal-cf/pivotal-ui/releases/tags/${tagName}`)).data.id;

  return axios.patch(
    `https://api.github.com/repos/pivotal-cf/pivotal-ui/releases/${releaseId}`,
    { body: versionChanges },
    { headers: {'Authorization': `token ${process.env.RELEASE_TOKEN}`} }
  );
}
