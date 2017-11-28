"use strict";

const GIANTBOMB_SEARCH_URL = "https://www.giantbomb.com/api/search/";
const TWITCH_STREAM_URL = "https://api.twitch.tv/kraken/streams/";

//Accessing the GiantBomb API
function getGameInfo(searchGame, callback) {
  const settings = {
    url: GIANTBOMB_SEARCH_URL,
    data: {
      api_key: "93fcfc5c4dcf9dc006ae4aeabfc7f17eb44fda42",
      query: `${searchGame}`,
      resources: "game",
      format: "jsonp",
      limit: 5
    },
    dataType: "jsonp",
    type: "GET",
    crossDomain: true,
    jsonp: "json_callback",
    success: callback
  };
  $.ajax(settings);
}

//Accessing the Twitch API
function getGameStreams(searchGame, callback) {
  const settings = {
    url: TWITCH_STREAM_URL,
    data: {
      client_id: "mwowk4xu6vjs06cwjzh9jf32igyl6z",
      game: `${searchGame}`,
      query: `${searchGame}`,
      format: "jsonp",
      type: "video",
      limit: 3
    },
    jsonp: "json_callback",
    type: "GET",
    success: callback
  };
  $.ajax(settings);
}
