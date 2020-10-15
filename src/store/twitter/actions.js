import config from '@/config';
import { fetchTweetsOnHashTag } from '@/services/twitter';

export default {
  /*
    Fetch the tweets by hashtag stored in the config.
  */
  fetchTweets({ commit }) {
    commit('twitter/STARTED_FETCHING');
    Promise.all(
      config.TWITTER_POLL_HASHTAGS.map((hashtag) => fetchTweetsOnHashTag({ hashtag })),
    )
      .then((values) => {
        const tweets = values.reduce((a, v) => [...a, ...v], []);
        commit('twitter/RENEW_TWEET_BANK', tweets);
        commit('twitter/STOPPED_FETCHING');
      });
  },
  /*
    Initialize the fetching of tweets based on the set
    interval.
  */
  initialize({ dispatch }) {
    dispatch('fetchTweets');
    const interval = window.setInterval(() => {
      dispatch('fetchTweets');
    }, config.TWITTER_POLL_INTERVAL);

    return interval;
  },
};
