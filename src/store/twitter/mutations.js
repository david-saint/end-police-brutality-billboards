import Vue from 'vue';

export default {
  RENEW_TWEET_BANK(state, tweets) {
    const tweetBank = {};
    tweets.forEach((tweet) => {
      tweetBank[tweet.id] = tweet;
    });
    Vue.set(state, 'tweetBank', tweetBank);
  },

  SEEN_TWEET(state, id) {
    Vue.delete(state.tweetBank, id);
  },

  STARTED_FETCHING(state) {
    Vue.set(state, 'isFetching', true);
  },

  STOPPED_FETCHING(state) {
    Vue.set(state, 'isFetching', false);
  },
};
