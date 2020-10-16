export default {
  TWITTER_POLL_DEFAULT_COUNT: 20,
  TWITTER_POLL_USER: 'theskyradio',
  TWITTER_POLL_INTERVAL: 15 * 60 * 1000, // Poll twitter every 15 mins
  TWITTER_TWEET_SHOW_INTERVAL: 60 * 1000, // Show each tweet for 1 minute.
  TWITTER_POLL_ENDPOINT: process.env.VUE_APP_TWITTER_POLL_ENDPOINT,
};
