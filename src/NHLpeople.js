'use strict';

var logoDict = new Object();

logoDict[1] = "https://assets.nhle.com/logos/nhl/svg/NJD_light.svg";
logoDict[2] = "https://assets.nhle.com/logos/nhl/svg/NYI_light.svg";
logoDict[3] = "https://assets.nhle.com/logos/nhl/svg/NYR_light.svg";
logoDict[4] = "https://assets.nhle.com/logos/nhl/svg/PHI_light.svg";
logoDict[5] = "https://assets.nhle.com/logos/nhl/svg/PIT_light.svg";
logoDict[6] = "https://assets.nhle.com/logos/nhl/svg/BOS_light.svg";
logoDict[7] = "https://assets.nhle.com/logos/nhl/svg/BUF_light.svg";
logoDict[8] = "https://assets.nhle.com/logos/nhl/svg/MTL_light.svg";
logoDict[9] = "https://assets.nhle.com/logos/nhl/svg/OTT_light.svg";
logoDict[10] = "https://assets.nhle.com/logos/nhl/svg/TOR_light.svg";
logoDict[12] = "https://assets.nhle.com/logos/nhl/svg/CAR_light.svg";
logoDict[13] = "https://assets.nhle.com/logos/nhl/svg/FLA_light.svg";
logoDict[14] = "https://assets.nhle.com/logos/nhl/svg/TBL_light.svg";
logoDict[15] = "https://assets.nhle.com/logos/nhl/svg/WSH_light.svg";
logoDict[16] = "https://assets.nhle.com/logos/nhl/svg/CHI_light.svg";
logoDict[17] = "https://assets.nhle.com/logos/nhl/svg/DET_light.svg";
logoDict[18] = "https://assets.nhle.com/logos/nhl/svg/NSH_light.svg";
logoDict[19] = "https://assets.nhle.com/logos/nhl/svg/STL_light.svg";
logoDict[20] = "https://assets.nhle.com/logos/nhl/svg/CGY_light.svg";
logoDict[21] = "https://assets.nhle.com/logos/nhl/svg/COL_light.svg";
logoDict[22] = "https://assets.nhle.com/logos/nhl/svg/EDM_light.svg";
logoDict[23] = "https://assets.nhle.com/logos/nhl/svg/VAN_light.svg";
logoDict[24] = "https://assets.nhle.com/logos/nhl/svg/ANA_light.svg";
logoDict[25] = "https://assets.nhle.com/logos/nhl/svg/DAL_light.svg";
logoDict[26] = "https://assets.nhle.com/logos/nhl/svg/LAK_light.svg";
logoDict[28] = "https://assets.nhle.com/logos/nhl/svg/SJS_light.svg";
logoDict[29] = "https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg";
logoDict[30] = "https://assets.nhle.com/logos/nhl/svg/MIN_light.svg";
logoDict[52] = "https://assets.nhle.com/logos/nhl/svg/WPG_light.svg";
logoDict[53] = "https://assets.nhle.com/logos/nhl/svg/ARI_light.svg";
logoDict[54] = "https://assets.nhle.com/logos/nhl/svg/VGK_light.svg";
logoDict[55] = "https://assets.nhle.com/logos/nhl/svg/SEA_light.svg";

function displayPlayerInformation(playerJson) {

    displayName(playerJson);
    displayAge(playerJson);
    displayBirthday(playerJson);
    displayCurrentTeam(playerJson);
    displayBodyInfo(playerJson);
    displayPlayerInfo(playerJson);
    displayCaptainStatus(playerJson);
    displayPlayerImage(playerJson);
}

function displayPlayerInfo(playerJson) {
    let shootsCatches = 'righty'
    if (playerJson.shootsCatches === 'L') {
        shootsCatches = 'lefty';
    }
    let displayText = playerJson.firstName + " is a " + shootsCatches + " and is a " + playerJson.primaryPosition.name;
    displayString(displayText, 'h2', "player-info");
}

function displayBodyInfo(playerJson) {
    let displayText = playerJson.firstName + " is " + playerJson.height + " and weighs " + playerJson.weight;
    displayString(displayText, 'h2', "player-info");
}

function displayCurrentTeam(playerJson) {
    let displayText = playerJson.firstName + " is on the " + '<a href="./index.html?' + 'theme=' + document.body.className + '&teamID=' + playerJson.currentTeam.id + '">' + playerJson.currentTeam.name + "</a>";
    displayString(displayText, 'h2', "player-info");
}

function displayBirthday(playerJson) {
    let displayText = playerJson.firstName + " was born on " + playerJson.birthDate;
    displayString(displayText, 'h2', "player-info");
}

function displayAge(playerJson) {
    let displayText = playerJson.firstName + " is " + playerJson.currentAge + " years old";
    displayString(displayText, 'h2', "player-info");
}

function displayCaptainStatus(playerJson) {
    let displayText = playerJson.firstName + " is " + ((playerJson.captain) ? "" : "not") + " a captain";
    displayString(displayText, 'h2', "player-info");
}

function displayPlayerImage(playerJson) {
    clearBox('player-image');
    let img = document.createElement('img');
    img.id = "player-img";
    img.src = 'http://nhl.bamcontent.com/images/headshots/current/168x168/' + playerJson.id + '.jpg';
    document.getElementById("player-image").appendChild(img);
}

function displayTeamImage(teamID) {
    document.getElementById('team-logo').src = logoDict[teamID];
    document.getElementById('team-logo').className = "";
}


function displayName(playerJson) {
    display("Full Name", playerJson.fullName, 'h2');
}

function displayString(string, element, elementID) {
    let el = document.createElement(element);
    el.innerHTML = string;
    document.getElementById(elementID).appendChild(el);
    //"player-info"
}


function displayPlayersTotalAssists(playerStats) {
    let displayText = "Total Assists " + playerStats.getAssits();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersGamesPlayed(playerStats) {
    let displayText = "Total Games Played " + playerStats.getGamesPlayed();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersPenaltyMinutes(playerStats) {
    let displayText = "Total Penalty Minutes " + playerStats.getPenaltyMinutes();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersShots(playerStats) {
    let displayText = "Total Shots " + playerStats.getTotalShots();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersGoals(playerStats) {
    let displayText = "Total Goals " + playerStats.getTotalGoals();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersPowerPlayGoals(playerStats) {
    let displayText = "Total Power Play goals " + playerStats.getTotalPowerPlayGoals();
    displayString(displayText, 'h2', "player-stats");
}

function displayPlayersPowerPlayPoints(playerStats) {
    let displayText = " Total Power Play points " + playerStats.getTotalPowerPlayPoints();
    displayString(displayText, 'h2', "player-stats");
}




function displayPlayersShotPercentage(playerStats) {
    let displayText = " Total Shot Percentage " + playerStats.getShotPercentage() + "%";
    displayString(displayText, 'h2', "player-stats");
}



function display(key, value, element) {
    let h1 = document.createElement(element);
    h1.innerHTML = key + ' : ' + value;
    document.getElementById("player-info").appendChild(h1);
}

function createPlayer(playerID) {
    const playerURL = 'https://statsapi.web.nhl.com/api/v1/people/' + playerID;
    const player = new XMLHttpRequest();
    player.open('GET', playerURL, true);
    displayString("<u>Player Info:</u>", 'h1', 'player-info');
    player.onload = function() {
        if (player.status === 200) {
            let playerJson = JSON.parse(player.responseText);
            displayPlayerInformation(playerJson.people[0]);
            getPlayerStats(playerID, playerJson.people[0]);

        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    player.send();
}

function removePlayerDropDown() {
    clearBox('locality-dropdown-player');
}

function removePlayerInfo() {
    clearBox('player-info');
}

function removePlayerStats() {
    clearBox('player-stats')
}

function clearBox(elementID) {
    var div = document.getElementById(elementID);
    if (div.firstChild === null) {
        return;
    }
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function setDefaultPlayerImage() {
    let img = document.createElement('img');
    img.id = "player-img";
    img.src = "https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg";
    img.className = "logo";
    document.getElementById("player-image").appendChild(img);
}


function createPlayerDropDown(teamID) {
    clearBox('player-dropdown');
    clearBox('player-info');
    clearBox('player-stats');
    clearBox('piechart');
    clearBox('player-image');
    displayTeamImage(teamID);
    document.getElementById('piechart').style = '';
    setDefaultPlayerImage();

    const rosterURL = 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '/roster';
    const rosters = new XMLHttpRequest();
    rosters.open('GET', rosterURL, true);
    rosters.onload = function() {
        if (rosters.status === 200) {
            let roster_data = JSON.parse(rosters.responseText);
            console.log(roster_data);

            let dropdown = document.createElement('select');
            let button = document.createElement('button');
            dropdown.classList.add('select');
            button.classList.add('button');
            dropdown.id = "locality-dropdown-player";
            dropdown.name = "locality";
            button.type = "button";
            button.id = "submitPlayer"
            button.innerHTML = "Submit";
            button.onclick = function() {
                var x = document.getElementById("locality-dropdown-player");
                let playerID = x.options[x.selectedIndex].value;
                removePlayerInfo();
                removePlayerStats();
                createPlayer(playerID);
            };
            let defaultOption = document.createElement('option');
            defaultOption.text = 'Choose a Player';
            defaultOption.classList.add('option');
            dropdown.add(defaultOption);
            for (let p = 0; p < Object.keys(roster_data['roster']).length; p++) {
                let option = document.createElement('option');
                option.text = roster_data['roster'][p].person.fullName;
                option.classList.add('option');
                option.value = roster_data['roster'][p].person.id;
                dropdown.add(option);
            }
            document.getElementById("player-dropdown").appendChild(dropdown);
            document.getElementById("player-dropdown").appendChild(button);

        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    rosters.send();
}




function getPlayerStats(playerID, playerJson) {
    const url = 'https://statsapi.web.nhl.com/api/v1/people/' + playerID + '/stats?stats=statsSingleSeason&season=20202021';

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        displayString("<u>Player Stats:</u>", 'h1', 'player-stats');
        if (request.status === 200) {
            console.log(JSON.parse(request.responseText));
            let playerStats = null
            try {
                playerStats = JSON.parse(request.responseText).stats[0].splits[0].stat;
            } catch (error) {

            }

            if (playerStats) {
                let mplayerStats = new PlayerStats(playerStats);
                let mplayerInfo = new PlayerInfo(playerJson);
                displayPlayerStats(mplayerStats);
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);


                function drawChart() {
                    document.getElementById('piechart').style = "width: 500px; height: 400px;";
                    console.log(mplayerStats.getGamesPlayed());
                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Goals', mplayerStats.getTotalGoals()],
                        ['Assists', mplayerStats.getAssits()],
                        ['Power Play Goals', mplayerStats.getTotalPowerPlayGoals()],
                        ['Power Play Points', mplayerStats.getTotalPowerPlayPoints()]
                    ]);

                    var options = {
                        backgroundColor: 'gray',
                        title: mplayerInfo.getFullName() + ' Stats for 2020-2021',
                        is3D: true
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                    chart.draw(data, options);
                }
            } else {
                displayString("No Player Stats", 'h2', 'player-stats');
            }
        } else {
            // Reached the server, but it returned an error
            displayString("No Player Stats:", 'h2', 'player-stats');

        }
        return null;
    }
    request.send();

}

function displayPlayerStats(playerStats) {
    displayPlayersTotalAssists(playerStats);
    displayPlayersGamesPlayed(playerStats);
    displayPlayersPenaltyMinutes(playerStats);
    displayPlayersShots(playerStats);
    displayPlayersGoals(playerStats);
    displayPlayersPowerPlayGoals(playerStats);
    displayPlayersPowerPlayPoints(playerStats);
    displayPlayersShotPercentage(playerStats);
}

function createTeamDropDown() {
    const url = 'https://statsapi.web.nhl.com/api/v1/teams';

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            console.log(data['teams']);
            data = data['teams'];
            let option;
            let dropdown = document.createElement('select');
            let button = document.createElement('button');
            dropdown.classList.add('select');
            button.classList.add('button');
            dropdown.id = "locality-dropdown-team";
            dropdown.name = "locality";
            button.type = "button";
            button.id = "submitTeam"
            button.innerHTML = "Submit";
            button.onclick = function() {
                var x = document.getElementById("locality-dropdown-team");
                let teamID = x.options[x.selectedIndex].value;
                createPlayerDropDown(teamID);
            };
            let defaultOption = document.createElement('option');
            defaultOption.text = 'Choose a Team';
            defaultOption.classList.add('option');
            dropdown.add(defaultOption);
            // button.onclick = "
            for (let i = 0; i < data.length - 1; i++) {
                option = document.createElement('option');
                option.text = data[i].name;
                option.classList.add('option');
                option.value = data[i].id;
                dropdown.add(option);
            }
            document.getElementById("teams-dropdown").appendChild(dropdown);
            document.getElementById("teams-dropdown").appendChild(button);
        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    request.send();
}
const param = new URLSearchParams(window.location.href);
if (param.has("playerID") && param.has("teamID")) {
    let playerID = param.get("playerID");
    let teamID = param.get("teamID");
    createTeamDropDown();
    createPlayerDropDown(teamID);
    createPlayer(playerID);
} else {
    createTeamDropDown();
}





class PlayerInfo {
    constructor(playerJson) {
        this.playerJson = playerJson;
    }

    getFullName() {
        return this.playerJson.fullName;
    }

    getAge() {
        return this.playerJson.currentAge;
    }

    getBirthDay() {
        return this.playerJson.birthDate;
    }

    getFirstName() {
        return this.playerJson.firstName;
    }

    getHeight() {
        return this.playerJson.height;
    }

    getWeight() {
        return this.playerJson.weight;
    }

    getPrimaryPositionName() {
        return this.playerJson.primaryPosition.name;
    }

    getCaptainStatus() {
        return this.playerJson.captain;
    }


}


class PlayerStats {

    constructor(statsJson, year) {
        this.statsJson = statsJson;
    }

    getAssits() {
        return checkUndefined(this.statsJson.assists);
    }

    getGamesPlayed() {
        return checkUndefined(this.statsJson.games);
    }

    getPenaltyMinutes() {
        return checkUndefined(this.statsJson.penaltyMinutes);
    }

    getTotalShots() {
        return checkUndefined(this.statsJson.shots);
    }

    getTotalGoals() {
        return checkUndefined(this.statsJson.goals);
    }

    getTotalPowerPlayGoals() {
        return checkUndefined(this.statsJson.powerPlayGoals);
    }

    getTotalPowerPlayPoints() {
        return checkUndefined(this.statsJson.powerPlayPoints);
    }

    getShotPercentage() {
        return checkUndefined(this.statsJson.shotPct);
    }

}

function checkUndefined(val) {
    if (val === undefined) {
        return 0;
    } else {
        return val;
    }
}

//8477936