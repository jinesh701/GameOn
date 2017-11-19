"use strict";

const GIANTBOMB_SEARCH_URL = 'https://www.giantbomb.com/api/search';

function getGameInfo(searchGame, callback) {
    const settings = {
        url: GIANTBOMB_SEARCH_URL,
        data: {
            api_key: '93fcfc5c4dcf9dc006ae4aeabfc7f17eb44fda42',
            query: `${searchGame}`,
            format: 'jsonp',
            resources: 'game',
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


function getGameStreams(searchGame, callback) {
    const data = {
        name: 'Super Mario Odyssey',
        streamId: '123',
        url: 'twitch.tv/user1',
        thumbnail: 'http://via.placeholder.com/320x200'
    };
    callback(data);
}

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
        <img src="${gameInfo.results[0].image.medium_url}" class="game-image col-4" alt="Image of ${gameInfo.results[0].name} cover">
        <ul class="platforms col-6">
        <h3 class="col-12">Original release date:</h3>${date}
        <h3>Platforms:</h3>
        </ul>
        <p class="game-description col-6">${gameInfo.results[0].deck}</p>
        <p class="col-6"><b>For more details about the game: <a href="${gameInfo.results[0].site_detail_url}" target="_blank">Click Here</a></b></p>
        <h3 class="col-12 live-stream-header">Top 3 Twitch live streams for ${gameInfo.results[0].name}</h3>
        <a href="${streamData.url}"><img src="${streamData.thumbnail}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
        <a href="${streamData.url}"><img src="${streamData.thumbnail}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
        <a href="${streamData.url}"><img src="${streamData.thumbnail}" class="twitch-stream col-4" alt="Image of Twitch stream"></a>
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
    }
}

const displayGameInfo = function (gameData) {
    getGameStreams(gameData.results.name, displayStreamData(gameData));
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