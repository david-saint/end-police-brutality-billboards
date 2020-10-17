<template>
  <div
    class="end-sars-twitter"
    :style="{backgroundImage: `url(${require('@/assets/texture.png')})`}">
    <div class="container">
      <div class="endsars-title">
        <vue-typed-js
          loop
          shuffle
          :typeSpeed="100"
          :backSpeed="50"
          :backDelay="2000"
          :strings="strings"
          :contentType="'html'"
        >
          <h1>#End<span class="typing"></span></h1>
        </vue-typed-js>
      </div>
      <div class="tweetBox-container">
        <div
          class="tweetBox"
          style="display:flex;align-items:center;justify-content:center;" v-if="loading">
          <basic-loader color="#1C8AD7" :thickness="2" />
        </div>
        <div class="tweetBox" v-else>
          <div class="top">
            <div
              class="user-image"
              :style="{backgroundImage: `url(${tweet.user.profile_image_url_https})`}"
            ></div>
            <div class="user-details">
              <span class="display-name">{{tweet.user.name}}</span>
              <span class="user-name">@{{tweet.user.screen_name}}</span>
            </div>
            <img class="twitter-logo" src="@/assets/twitter.svg" alt="">
          </div>
          <div class="content">
            <span class="tweet" v-html="parseTweet(tweet.full_text)"></span>
            <span class="date">{{tweet.created_at | tweetDate}}</span>
          </div>
          <div class="stats">
            <div class="stats-c">
              <div class="stats-item">
                <img src="@/assets/ic_comments.svg" alt="">
                <span>{{tweet.comment_count}}</span>
              </div>
              <div class="stats-item">
                <img src="@/assets/ic_retweet.svg" alt="">
                <span>{{tweet.retweet_count}}</span>
              </div>
              <div class="stats-item">
                <img src="@/assets/ic_like.svg" alt="">
                <span>{{tweet.favorite_count}}</span>
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
import moment from 'moment';
import config from '@/config';
import BasicLoader from '@/components/loaders/BasicLoader.vue';

export default {
  name: 'end-sars-twitter',
  components: { BasicLoader },
  data() {
    return {
      tweet: {},
      polling: null,
      showing: null,
      unwatch: null,
      strings: [
        'SARS',
        'SWAT',
        'Police<br>Brutality',
        'Bad<br>Governance',
      ],
    };
  },
  created() {
    this.polling = this.$store.dispatch('twitter/initialize');
    this.unwatch = this.$store.watch(
      (state, getters) => getters['twitter/is_fetching'],
      (value) => {
        if (this.showing) {
          window.clearInterval(this.showing);
        }
        if (!value) {
          this.getRandomTweet();
          this.showing = window.setInterval(
            () => this.getRandomTweet(),
            config.TWITTER_TWEET_SHOW_INTERVAL,
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
      const { favorite_count: f, retweet_count: r } = tweet;
      const min = Math.min(f, r);
      const max = Math.max(f, r);
      tweet.comment_count = Math.floor((Math.random() * (max - min) + min) / 5);
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
    parseLinks(tweet) {
      return tweet.replace(/(?:(https?:\/\/[^\s]+))/m, '<a href="$1" class="twitter-link" target="_blank">$1</a>');
    },
    parseLineBreaks(tweet) {
      return tweet.replace(/\n/g, '<br>');
    },
    parseTweet(tweet) {
      return this.parseLineBreaks(
        this.parseHashtag(
          this.parseUsername(
            this.parseLinks(tweet),
          ),
        ),
      );
    },
  },
  filters: {
    tweetDate(d) {
      const m = moment(d);
      const md = (Math.ceil(moment().diff(m, 'minutes')) || 1);
      const hd = Math.ceil(moment().diff(m, 'hours'));

      if (md < 60) {
        return `${md}m - ${m.format('MMM DD, YYYY')}`;
      }

      if (hd < 24) {
        return `${hd}h - ${m.format('MMM DD, YYYY')}`;
      }

      return `${m.format('MMM DD, YYYY')}`;
    },
  },
  beforeDestroy() {
    this.unwatch();
    window.clearInterval(this.polling);
    window.clearInterval(this.showing);
  },
};
</script>

<style lang="scss"></style>
