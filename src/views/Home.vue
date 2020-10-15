<template>
  <div
    class="end-sars-twitter"
    :style="{backgroundImage: `url(${require('@/assets/texture.png')})`}">
    <div class="container">
      <div class="endsars-title">
        <h1><span>#End</span>Police<br>Brutality</h1>
      </div>
      <div class="tweetBox"></div>
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
      tweet: {},
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
      this.$nextTick(() => {
        this.tweet = tweet;
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

<style lang="scss" scoped>
  .end-sars-twitter {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-repeat: repeat;
    background-color: #000000;
    .hands {
      left: 0;
      bottom: -5%;
      width: 33%;
      height: 100%;
      position: absolute;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom left;
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 2.5%% 5%;
      position: relative;
      box-sizing: border-box;
      @media (orientation: landscape) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }
      @media (orientation: portrait) {
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
      }
      .endsars-title {
        h1 {
          margin: 20px 0;
          color: #FFFFFF;
          font-size: 101px;
          text-align: center;
          font-family: "Gilroy";
          span {
            color: #F1531C;
          }
        }
      }
      img.candle-logo {
        right: 3%;
        bottom: 70px;
        width: auto;
        height: 70px;
        position: absolute;
      }
    }
  }
</style>
