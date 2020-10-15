export default {
  tweets: (state) => Object.values(state.tweetBank),
  is_fetching: (state) => Boolean(state.isFetching),
};
