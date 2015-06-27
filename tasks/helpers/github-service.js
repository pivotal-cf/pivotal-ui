import axios from 'axios';

export async function addReleaseNotesToTag(tagName, versionChanges) {
  const releaseId = (await axios.get(`https://api.github.com/repos/pivotal-cf/pivotal-ui/releases/tags/${tagName}`)).data.id;

  return axios.patch(
    `https://api.github.com/repos/pivotal-cf/pivotal-ui/releases/${releaseId}`,
    { body: versionChanges },
    { headers: {'Authorization': `token ${process.env.RELEASE_TOKEN}`} }
  );
}
