import axios from 'axios';

function url(storiesFilter) {
  return `https://www.pivotaltracker.com/services/v5/projects/1126018/stories?filter=${storiesFilter}`;
}

const privates = new WeakMap();

export default class TrackerHelper {
  constructor(trackerToken) {
    privates.set(this, {trackerToken});
  }

  async getStories(storyNumbers) {
    const {trackerToken} = privates.get(this);
    const stories = {};
    const storiesFilter = Array.from(new Set(storyNumbers))
      .map((storyNumber) => `id:${storyNumber}`)
      .join(' OR ');
    await axios.get(url(storiesFilter), {headers: {'X-TrackerToken': trackerToken}})
      .then(({data}) => {
        data.forEach((storyData) => {
          stories[storyData.id] = storyData;
        });
      })
      .catch(e => console.error(e.message));
    return stories;
  }
};