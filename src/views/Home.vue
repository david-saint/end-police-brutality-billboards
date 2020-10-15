<template>
  <div
    class="end-sars-twitter"
    :style="{backgroundImage: `url(${require('@/assets/texture.png')})`}">
    <div class="container">
      <div class="endsars-title">
        <h1><span>#End</span>Police<br>Brutality</h1>
      </div>
      <div class="tweetBox-container">
        <div class="tweetBox">
          <div class="top">
            <div class="user-image"></div>
            <div class="user-details">
              <span class="display-name">Rinu #SARSMUSTEND💡</span>
              <span class="user-name">@Savvyrinu</span>
            </div>
            <img class="twitter-logo" src="@/assets/twitter.svg" alt="">
          </div>
          <div class="content">
            <span class="tweet" v-html="parseUsername(parseHashtag(tweet.content))"></span>
            <span class="date">6m - Oct 10, 2010</span>
          </div>
          <div class="stats">
            <div class="stats-c">
              <div class="stats-item">
                <img src="@/assets/ic_comments.svg" alt="">
                <span>72</span>
              </div>
              <div class="stats-item">
                <img src="@/assets/ic_retweet.svg" alt="">
                <span>198</span>
              </div>
              <div class="stats-item">
                <img src="@/assets/ic_like.svg" alt="">
                <span>723</span>
              </div>
            </div>
            <img class="report-icon" src="@/assets/info-icon.svg" alt="">
          </div>
        </div>
      </div>
      <img class="candle-logo" src="@/assets/candle-logo.png" alt="">
    </div>
    <div
      class="hands"
      :style="{backgroundImage: `url(${require('@/assets/hands.png')})`}"></div>
  </div>
</template>

<script>
import config from '@/config';

export default {
  name: 'end-sars-twitter',
  components: {},
  data() {
    return {
      tweet: {
        content: 'Jack just tweeted #EndSARS why you dey lose focus #EndSWAT!!! ✊🏾 Soro Soko weyrey @MBuhari',
      },
      polling: null,
      showing: null,
      unwatch: null,
    };
  },
  created() {
    this.polling = this.$store.dispatch('twitter/initialize');
    this.unwatch = this.$store.watch(
      (state, getters) => getters['twitter/is_fetching'],
      (value) => {
        if (value) {
          this.showing();
        } else {
          this.showing = window.setInterval(
            this.getRandomTweet(), config.TWITTER_TWEET_SHOW_INTERVAL,
          );
        }
      },
    );
  },
  computed: {
    tweets() {
      return this.$store.getters['twitter/tweets'];
    },
    loading() {
      return Object.keys(this.tweet).length === 0;
    },
  },
  methods: {
    getRandomTweet() {
      const tweet = this.tweets[Math.floor(Math.random() * this.tweets.length)];
      this.$store.commit('twitter/SEEN_TWEET', tweet.id);
      this.$nextTick(() => {
        this.tweet = tweet;
      });
    },
    parseHashtag(tweet) {
      return tweet.replace(/[#]+[A-Za-z0-9-_]+/g, (t) => {
        const tag = t.replace('#', '');
        return `<a class="twitter-link" href="https://www.twitter.com/hashtag/${tag}" target="_blank">#${tag}</a>`;
      });
    },
    parseUsername(tweet) {
      return tweet.replace(/[@]+[A-Za-z0-9-_]+/g, (t) => {
        const tag = t.replace('@', '');
        return `<a class="twitter-link" href="https://www.twitter.com/${tag}" target="_blank">@${tag}</a>`;
      });
    },
  },
  beforeDestroy() {
    this.polling();
    this.unwatch();
    this.showing();
  },
};
</script>

<style lang="scss"></style>
