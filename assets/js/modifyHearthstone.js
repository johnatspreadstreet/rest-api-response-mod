'use strict';

const json = require('./hearthstone.json');
const {body} = json;
const basic = body['Basic'];

const expansions = Object.keys(body);

console.log(expansions); 