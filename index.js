//Renders platform information for each game 
const renderPlatformInfo = function (platformResult) {
    const gamePlatform = [];

    for (let i = 0; i <= `${platformResult.length - 1}`; i++) {
        gamePlatform.push(platformResult[i].name);
    }

    let platforms = '';
    gamePlatform.forEach(function (platformItem) {
        platforms += `<li>${platformItem}</li>`;
    });
    return platforms;
}

//Renders the release date of each game
const renderDate = function (gameDate) {
    let date = '';
    let year = '';
    let month = '';
    let day = '';

    if (gameDate !== null) {
        let year = `${gameDate.slice(0,4)}`;
        let month = `${gameDate.slice(5,7)}`;
        let day = `${gameDate.slice(8,10)}`;
        date = `${month}/${day}/${year}`;
    } else {
        date = 'No release date found';
    }
    return date;
}

//Renders game information for the searched game
const renderGameInfo = function (gameInfoResult) {
    return `<div class="js-game-data row">
                <h2 class="game-name col-12">${gameInfoResult.name}</h2>
                <img src="${gameInfoResult.image.medium_url}" class="game-image col-4" alt="Box art for ${gameInfoResult.name}">
                <ul class="platforms col-6">
                <h3 class="col-12">Original release date:</h3>${renderDate(gameInfoResult.original_release_date)}
                <h3>Platforms:</h3>
                ${renderPlatformInfo(gameInfoResult.platforms)}
                </ul>
                <p class="game-description col-6">${gameInfoResult.deck} <br> <br> <span class="game-details col-12"><b>For more details about the game: <a href="${gameInfoResult.site_detail_url}" target="_blank">Click Here</a></b></span></p>
            </div>
            `;
}

//Renders stream information for the searched game
const renderStreams = function (streamData) {
    const streams = [];

    for (let i = 0; i <= `${streamData.streams.length - 1}`; i++) {
        streams.push(streamData.streams[i].channel.name);
    }

    let streamsRender = '';
    streams.forEach(function (stream) {
        streamsRender += `<div class="js-stream-data row">
        <iframe 
            class="col-4 twitch-stream" 
            src="https://player.twitch.tv/?channel=${stream}&autoplay=false"
            height="320"
            width="160"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true">
        </iframe>`
    });
    return streamsRender;
}

//Displays header for streams, available streams, and the search again button
const renderHeader = (title) => `<h3 class="col-12 live-stream-header">${title}</h3>`;
const renderSearchAgain = `<div class="col-12 reset-btn-container"><button type="submit" class="reset-btn">Search Again</button></div>`;

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
        ${renderSearchAgain}
        `);

        console.log(gameInfo);
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