'use strict';

const fs = require('fs');
const unirest = require('unirest');

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards')
  .header('X-Mashape-Key', 'dMHkSEuoDrmshZxFIPf47djFFMJJp1EbTC7jsnzkaUs8ALPf4R')
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    storeData(result, './hearthstone.json');
  });