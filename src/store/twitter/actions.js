import config from '@/config';
import { fetchUserTweets } from '@/services/twitter';

export default {
  /*
    Fetch the tweets by hashtag stored in the config.
  */
  fetchTweets({ commit }) {
    commit('twitter/STARTED_FETCHING');
    fetchUserTweets({ count: 50 })
      .then((values) => {
        const tweets = values.filter(v => v.retweeted).map(t => {
          return t.retweeted_status;
        });
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
