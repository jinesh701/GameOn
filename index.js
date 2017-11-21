//Renders platform information for each game 
const renderPlatformInfo = function (platformResult) {
    const gamePlatform = [];

    for (let i = 0; i <= `${platformResult.length - 1}`; i++) {
        let getPlatforms = gamePlatform.push(platformResult[i].name);
    }

    let platforms = '';
    gamePlatform.forEach(function (platformItem) {
        platforms += `<li>${platformItem}</li>`;
    });
    return platforms;
}

//Renders game information for the searched game
const renderGameInfo = function (gameInfoResult) {
    return `<div class="js-game-data row">
                <h2 class="game-name col-12">${gameInfoResult.name}</h2>
                <img src="${gameInfoResult.image.medium_url}" class="game-image col-4" alt="Box art for ${gameInfoResult.name}">
                <ul class="platforms col-6">
                <h3 class="col-12">Original release date:</h3>${gameInfoResult.original_release_date}
                <h3>Platforms:</h3>
                ${renderPlatformInfo(gameInfoResult.platforms)}
                </ul>
                <p class="game-description col-6">${gameInfoResult.deck} <br> <br> <span class="game-details col-12"><b>For more details about the game: <a href="${gameInfoResult.site_detail_url}" target="_blank">Click Here</a></b></span></p>
            </div>
            `;
}

//Renders stream information for the searched game, .map 
const renderStreams = function (streamData) {
    return `<div class="js-stream-data row">
                <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[0].channel.name}</h4>
                <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[0].viewers}</h4>
                <iframe 
                    class="col-4 twitch-stream" 
                    src="https://player.twitch.tv/?channel=${streamData.streams[0].channel.name}&autoplay=false"
                    height="320"
                    width="160"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
                <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[1].channel.name}</h4>
                <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[1].viewers}</h4>
                <iframe 
                    class="col-4 twitch-stream" 
                    src="https://player.twitch.tv/?channel=${streamData.streams[1].channel.name}&autoplay=false"
                    height="320"
                    width="160"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
                <h4 class="col-3 twitch-user">Channel Name: ${streamData.streams[2].channel.name}</h4>
                <h4 class="col-3 twitch-viewers">Viewers: ${streamData.streams[2].viewers}</h4>
                <iframe 
                    class="col-4 twitch-stream" 
                    src="https://player.twitch.tv/?channel=${streamData.streams[2].channel.name}&autoplay=false"
                    height="320"
                    width="160"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
                <br>
                <div class="col-12 reset-btn-container"><button type="submit" class="reset-btn">Search Again</button></div>
            </div>`;
}

const renderHeader = (title) => `<h3 class="col-12 live-stream-header">${title}</h3>`;

//Displays game info, header for streams, and the available streams
const displayStreamData = function (gameInfo) {
    return function (streamData) {
        let title = 'There are no streams available :(';
        let streamsSection = '';
        if (streamData._total !== 0) {
            title = `Top 3 Twitch Live Streams For ${gameInfo.results[0].name}`
            streamsSection = renderStreams(streamData);
        }

        $('.js-search-results').html(`
        ${renderGameInfo(gameInfo.results[0])}
        ${renderHeader(title)}
        ${streamsSection}
        `);

        console.log(streamData);
    }
}

const displayGameInfo = function (gameData) {
    getGameStreams(gameData.results[0].name, displayStreamData(gameData));
}

//Submit user input for game/stream search
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