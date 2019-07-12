import Vue from 'vue';

Vue.filter('diffFilter', diff => {
  if (diff > 1000) {
    diff /= 1000;
    diff = Math.round(10 * diff) / 10;
    return `${diff}k`;
  }
  diff = Math.round(10 * diff) / 10;
  return diff;
});
