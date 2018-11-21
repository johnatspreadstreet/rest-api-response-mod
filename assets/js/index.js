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

function queryParamTemplate(paramName, paramValue) {
  return `
  <div class="row u-max-full-width no-wrap">
    <div class="four columns">
        <input class="u-full-width" id="param-name" type="text" placeholder="Name" value="${paramName}">
    </div>
    <div class="four columns">
        <input class="u-full-width" id="param-value" type="text" placeholder="Value" value="${paramValue}">
    </div>
    <div class="four columns">
        <select name="types" id="">
            <option value="query">Query</option>
            <option value=""></option>
            <option value="cookie">Cookie</option>
            <option value="header">Header</option>
        </select>
        <button class="minus" disabled><i class="fas fa-minus u-center-block"></i></button>
        <button class="plus"><i class="fas fa-plus u-center-block"></i></button>
    </div>
  </div>
  `;
}

function buildParams() {
    $('.build-params').on('click', function(e) {
        e.preventDefault();
        const queryTarget = $('main').find('.query-url-box');
        let boxValue = queryTarget.val();
        let params = getUrlVars(boxValue);
        for (let param in params) {
          console.log(param);
          console.log(params);
          console.log(params[param]);
          if(params.hasOwnProperty(param)) {
            let value = params[param];
            //do something with value;
            $('.parameters').append(queryParamTemplate(param, value));
          }
        }
    });
}

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