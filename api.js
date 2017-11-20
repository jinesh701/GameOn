"use strict";

const GIANTBOMB_SEARCH_URL = 'https://www.giantbomb.com/api/search/';
const TWITCH_STREAM_URL = 'https://api.twitch.tv/kraken/streams/'; 

//Accessing the GiantBomb API 
function getGameInfo(searchGame, callback) {
    const settings = {
        url: GIANTBOMB_SEARCH_URL,
        data: {
            api_key: '93fcfc5c4dcf9dc006ae4aeabfc7f17eb44fda42',
            query: `${searchGame}`,
            resources: 'game',
            format: 'jsonp',
            limit: 1,
        },
        dataType: 'jsonp',
        type: 'GET',
        crossDomain: true,
        jsonp: 'json_callback',
        success: callback,
    };
    $.ajax(settings);
}


//Accessing the Twitch API
function getGameStreams(searchGame, callback) {
    const settings = {
        url: TWITCH_STREAM_URL,
        data: {
            client_id: 'mwowk4xu6vjs06cwjzh9jf32igyl6z',
            game: `${searchGame}`, 
            query: `${searchGame}`,
            format: 'jsonp',
            type: 'video', 
            limit: 3,  
        },
        jsonp: 'json_callback',
        type: 'GET',
        success: callback, 
    };
    $.ajax(settings);
}

//Displays data from the API that the user searches for
const displayStreamData = function (gameInfo) {
    return function (streamData) {
        const gamePlatform = [];

        for (let i = 0; i <= `${gameInfo.results[0].platforms.length - 1}`; i++) {
            let getPlatforms = gamePlatform.push(gameInfo.results[0].platforms[i].name);
        }

        let date = `${gameInfo.results[0].original_release_date.slice(0, 10)}`;

        $('.js-search-results').html(`
      <div class="js-game-data row">
        <h2 class="game-name col-12">${gameInfo.results[0].name}</h2>
        <img src="${gameInfo.results[0].image.medium_url}" class="game-image col-4" alt="Box art for ${gameInfo.results[0].name}">
        <ul class="platforms col-6">
        <h3 class="col-12">Original release date:</h3>${date}
        <h3>Platforms:</h3>
        </ul>
        <p class="game-description col-6">${gameInfo.results[0].deck} <br> <br> <span class="game-details col-12"><b>For more details about the game: <a href="${gameInfo.results[0].site_detail_url}" target="_blank">Click Here</a></b></span></p>
        <h3 class="col-12 live-stream-header">Top 3 Twitch Live Streams For ${gameInfo.results[0].name}</h3>
        <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[0].channel.name}</h4>
        <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[0].viewers}</h4>
        <a href="${streamData.streams[0].channel.url}" target="_blank"><img src="${streamData.streams[0].preview.medium}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
        <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[1].channel.name}</h4>
        <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[1].viewers}</h4>
        <a href="${streamData.streams[1].channel.url}" target="_blank"><img src="${streamData.streams[1].preview.medium}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
        <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[2].channel.name}</h4>
        <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[2].viewers}</h4>
        <a href="${streamData.streams[2].channel.url}" target="_blank"><img src="${streamData.streams[2].preview.medium}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
        <br>
        <div class="col-12 reset-btn-container"><button type="submit" class="reset-btn">Search Again</button></div>
      </div>
      `)

        gamePlatform.forEach(function (item) {
            $('.platforms').append(`<li>${item}</li>`)
        });

        console.log(date);
        console.log(gameInfo);
        console.log(gamePlatform);
        console.log(streamData); 
    }
}

const displayGameInfo = function (gameData) {
    getGameStreams(gameData.results[0].name, displayStreamData(gameData));
}

//Submit user input for game search
function handleSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-user-input');
        const query = $(queryTarget).val();
        queryTarget.val("");
        console.log(query);
        getGameInfo(query, displayGameInfo);
    });
}

handleSubmit();