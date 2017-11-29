//Renders platform information for each game
const renderPlatformInfo = function(platformResult) {
  function getName(platformItem) {
    return platformItem.name;
  }

  function wrapLi(item) {
    return `<li>${item}</li>`;
  }

  const gamePlatform = platformResult.map(item => wrapLi(getName(item)));
  return gamePlatform.join("");
};

//Renders the release date and reformats it
const renderDate = function(gameDate) {
  let date = "";
  let year = "";
  let month = "";
  let day = "";

  if (gameDate !== null) {
    let year = `${gameDate.slice(0, 4)}`;
    let month = `${gameDate.slice(5, 7)}`;
    let day = `${gameDate.slice(8, 10)}`;
    date = `${month}/${day}/${year}`;
  } else {
    date = "No release date found";
  }
  return date;
};

//Renders the game description
const renderGameDescription = function(gameDescription) {
  let description = "";

  if (gameDescription !== null) {
    description = `${gameDescription}`;
  } else {
    description = "No description was provided for this game";
  }
  return description;
};

//Renders extra results for the user
const renderExtraResults = function() {
  function getName(extraGameName) {
    return extraGameName.name;
  }

  function wrapHref(extraGameResult, index) {
    return `<a href="#" class="extra-results col-12" data-index="${index}">${
      extraGameResult
    }</a>`;
  }

  const gameName = retrieveGame().results.map(function(extraGameResult, index) {
    return wrapHref(getName(extraGameResult), index);
  });

  gameName.splice(0, 1);

  console.log(gameName);
  return gameName.join("");
};

//Renders game information for the searched game
const renderGameInfo = function(gameInfoResult) {
  return `<div class="js-game-data row">
            <p class="js-extra-results col-12">Did you mean:
                ${renderExtraResults()}
            </p>
            <hr>
                <h2 class="game-name col-12">${gameInfoResult.name}</h2>
                <img src="${
                  gameInfoResult.image.medium_url
                }" class="game-image col-4" alt="Box art for ${
    gameInfoResult.name
  }">
                <ul class="platforms col-6">
                <h3 class="col-12">Original release date:</h3>${renderDate(
                  gameInfoResult.original_release_date
                )}
                <h3>Platforms:</h3>
                ${renderPlatformInfo(gameInfoResult.platforms)}
                </ul>
                <p class="game-description col-6">${renderGameDescription(
                  gameInfoResult.deck
                )} <br> <br> <span class="game-details col-12"><b>For more details about the game: <a href="${
    gameInfoResult.site_detail_url
  }" target="_blank">Click Here</a></b></span></p>
          </div>
            `;
};

//Renders stream information for the searched game
const renderStreams = function(streamData) {
  function getStreamChannel(streamItem) {
    return streamItem.channel.name;
  }

  function wrapStream(streamChannel) {
    return `<iframe 
            class="col-4 twitch-stream" 
            src="https://player.twitch.tv/?channel=${
              streamChannel
            }&autoplay=false"
            height="320"
            width="160"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true">
        </iframe>`;
  }

  const streams = streamData.streams.map(streamChannel =>
    wrapStream(getStreamChannel(streamChannel))
  );
  return streams.join("");
};

//Displays header for streams, available streams, and the search again button
const renderHeader = title =>
  `<hr><h3 class="col-12 live-stream-header">${title}</h3>`;
const renderSearchAgain = `<div class="row"><div class="col-12 js-reset-btn"><input type="reset" value="Search Again" class="reset-btn"></div></div>`;

const displayStreamData = function(gameInfo) {
  return function(streamData) {
    let title = "There are no streams available :(";
    let streamsSection = "";
    if (streamData._total !== 0) {
      title = `Top 3 Twitch Live Streams For ${gameInfo.name}`;
      streamsSection = renderStreams(streamData);
    }

    $(".js-search-results")
      .html(
        `
        ${renderGameInfo(gameInfo)}
        ${renderHeader(title)}
        ${streamsSection}
        ${renderSearchAgain}
        `
      )
      .css("opacity", "1");
  };
};

const displayGameInfo = function(gameIndex, gameData) {
  getGameStreams(
    gameData.results[gameIndex].name,
    displayStreamData(gameData.results[gameIndex])
  );
};

//Submit user input for game/stream search
let gameStored = {};

function storeGame(gameInfo) {
  window.gameStored = gameInfo;
  return window.gameStored;
}

function retrieveGame() {
  return window.gameStored;
}

function handleSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-user-input");
    const query = $(queryTarget).val();
    queryTarget.val("");
    console.log(query);
    getGameInfo(query, gameInfo => displayGameInfo(0, storeGame(gameInfo)));
  });
}

//Displays additional results for users game search
function handleExtraResults() {
  $("body").on("click", ".extra-results", function(event) {
    let resultIndex = $(event.currentTarget).attr("data-index");
    displayGameInfo(resultIndex, retrieveGame());
  });
}

//Scrolls to top of page on click
function handleResetSearch() {
  $("body").on("click", ".reset-btn", function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
}

$(document).ready(function() {
  handleSubmit();
  handleExtraResults();
  handleResetSearch();
});
