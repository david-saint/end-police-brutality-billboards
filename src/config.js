export default {
  TWITTER_POLL_DEFAULT_COUNT: 50,
  TWITTER_POLL_USER: 'david_saint_', // theskyradio
  TWITTER_POLL_INTERVAL: 5 * 60 * 1000, // Poll twitter every 5 mins
  TWITTER_TWEET_SHOW_INTERVAL: 20 * 1000, // Show each tweet for 20 seconds.
  TWITTER_POLL_ENDPOINT: process.env.VUE_APP_TWITTER_POLL_ENDPOINT,
};
