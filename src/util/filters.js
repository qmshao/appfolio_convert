import Vue from 'vue';

Vue.filter('hashformatter', (hashrate, algo) => {
  const prefix = ['', 'K', 'M', 'G', 'T', 'P'];
  //const units = ['H', 'sol', 'c'];
  const algoUnits = { equihash: 'sol', cuckoo: 'c' };
  let unit = algoUnits[algo];
  if (!unit) {
    unit = 'H';
  }
  var i = 0;
  if (hashrate == 0) {
    return `0 ${unit}/s`;
  }
  while (hashrate > 1000) {
    hashrate /= 1000;
    i++;
  }
  hashrate = Math.round(hashrate * 10) / 10;
  return `${hashrate} ${prefix[i]}${unit}/s`;
});

Vue.filter('readableTimeDiff', (time, type) => {
  let timeDelta = 0;
  let units = '';

  switch (type) {
    case 'timeBlock':
      timeDelta = new Date().getTime() / 1000 - time;
      break;
    case 'absolute':
      timeDelta = time;
      break;
  }

  if (timeDelta > 60 * 60 * 24) {
    timeDelta = timeDelta / 60 / 60 / 24;
    units = 'd';
  } else if (timeDelta > 60 * 60) {
    timeDelta = timeDelta / 60 / 60;
    units = 'h';
  } else if (timeDelta > 60) {
    timeDelta = timeDelta / 60;
    units = 'm';
  } else {
    units = 's';
  }
  return `${Math.round(timeDelta)}${units}`;
});
Vue.filter('diffFilter', diff => {
  if (diff > 1000) {
    diff /= 1000;
    diff = Math.round(10 * diff) / 10;
    return `${diff}k`;
  }
  diff = Math.round(10 * diff) / 10;
  return diff;
});
