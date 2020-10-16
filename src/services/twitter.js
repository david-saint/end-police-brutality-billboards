import axios from 'axios';
import config from '@/config';

export function fetchTweetsOnHashTag({
  hashtag,
  count = config.TWITTER_POLL_DEFAULT_COUNT,
  resultType = 'mixed', /* can be 'mixed', 'popular', 'recent' */
}) {
  const params = {
    q: hashtag,
    count,
    result_type: resultType,
  };

  return new Promise((resolve, reject) => {
    axios.get(config.TWITTER_POLL_ENDPOINT, { params })
      .then(({ data: { statuses } }) => resolve(statuses))
      .catch((err) => reject(err));
  });
}

export function fetchUserTweets({ count, monitoredAccount }) {
  const params = {
    count,
    screen_name: monitoredAccount,
  };

  return new Promise((resolve, reject) => {
    axios.get(config.TWITTER_POLL_ENDPOINT, { params })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });
}
