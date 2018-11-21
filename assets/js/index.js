'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?';
const YOUTUBE_API_KEY = 'AIzaSyAFBaf7iZdFuLJOgQ224GIWuMQ4Z2dDM2g';

function createYoutubeLink(id) {
  // Creates a youtube video link if user has the video ID
  let link = `https://www.youtube.com/watch?v=${id}`;
  return link;
}

function createChannelLink(id) {
  // Creates a youtube channel link if user has the channel ID
  let link = `https://www.youtube.com/channel/${id}`;
  return link;
}

function getUrlVars(url) {
    let params = {};
    let parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        params[key] = value;
    });
    return params;
}

function buildParams() {
    $('.build-params').on('click', function(e) {
        e.preventDefault();
        const queryTarget = $(event.currentTarget).find('.query-url-box');
        let boxValue = queryTarget.val();
        console.log(boxValue);
        console.log(getUrlVars(boxValue));
    })
}

console.log(getUrlVars('https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=CAUQAA&q=warcraft&type=video&key=AIzaSyAFBaf7iZdFuLJOgQ224GIWuMQ4Z2dDM2g'));

function getDataFromYoutube(query, callback) {
  // This function will retrieve the data from the Youtube API
  const queryList = {
    part: 'snippet',
    q: query,
    key: YOUTUBE_API_KEY
  };
  $.getJSON(YOUTUBE_SEARCH_URL, queryList, callback);
}

function getDataFromURL(url, callback) {
  // This function will retrieve the data from the Youtube API
  $.getJSON(url, callback);
}

let fullArray = [];

//called with every property and its value
function processor(key,value) {
  let numclass = 'hljs';
  if (typeof value === 'number') {
    numclass = 'hljs-number';
  } else {
    numclass = 'hljs-string';
  }
  fullArray.push(`<span class='hljs-attr'>${key}</span> : <span class='${numclass}'>${value}</span><br>`);
}

function traverse(o,func) {
  for (let i in o) {
    func.apply(this,[i,o[i]]);  
    if (o[i] !== null && typeof(o[i])==='object') {
      //going one step down in the object tree!!
      traverse(o[i],func);
    }
  }
}

function fullTraversal(data) {
  traverse(data,processor);
  fullArray.join('');
}

function responseTemplate(data) {
  let displayData = JSON.stringify(data, null, ' ');

  return displayData;
}

function displayAPIResponse(data) {
  let results = responseTemplate(data);
  fullTraversal(data);
  $('.response').html(results);
  $('.nodes').html(fullArray);
  hljs.highlightBlock(document.querySelector('code'));
}

function resultsOnSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.query-url-box');
    let boxValue = queryTarget.val();
    console.log(boxValue);
    queryTarget.val('');
    getDataFromURL(boxValue, displayAPIResponse);
  });
}

// function renderResults() {
//   $('main').html(getDataFromYoutube('warcraft', displayAPIResponse));
// }

function runFunctions() {
  processor();
  traverse();
  fullTraversal();
  // renderResults();
  resultsOnSubmit();
  buildParams();
}

$(runFunctions);