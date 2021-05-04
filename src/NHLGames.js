'use strict'
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
                displayTeamsSchedule(teamID);
                displayTeamImage(teamID);
                displayTeamName(teamID);
                // put code to display teams games
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

function displayTeamImage(teamID) {
    document.getElementById('team-logo').src = logoDict[teamID];
}

//Displays upcoming events for the team selected
function displayTeamsSchedule(teamID) {

    var rightNow = new Date();
    var res = rightNow.toISOString().slice(0, 10);

    const upcomingGamesURL = 'https://statsapi.web.nhl.com/api/v1/schedule?teamId=' + teamID + '&startDate=' + res + '&endDate=2021-05-10'
    const upcomingGames = new XMLHttpRequest();
    upcomingGames.open('GET', upcomingGamesURL, true);
    upcomingGames.onload = function() {
        if (upcomingGames.status === 200) {
            let upcomingGames_data = JSON.parse(upcomingGames.responseText);
            console.log(upcomingGames_data);
            document.getElementById("game-sched-home-team").innerHTML = 'Home Team';
            document.getElementById("game-sched-away-team").innerHTML = 'Away Team';
            document.getElementById("game-sched-venue").innerHTML = 'Venue';
            document.getElementById("game-sched-date").innerHTML = 'Date';

            var game_schedule_home_team = document.getElementById("game-sched-home-team-1");
            var game_schedule_away_team = document.getElementById("game-sched-away-team-1");
            var game_schedule_venue = document.getElementById("game-sched-venue-1");
            var game_schedule_date = document.getElementById("game-sched-date-1");

            // setting it to an empty string will clear out the innerHTML if another team is selected
            game_schedule_date.innerHTML = "";
            game_schedule_venue.innerHTML = "";
            game_schedule_home_team.innerHTML = "";
            game_schedule_away_team.innerHTML = "";

            console.log(Object.keys(upcomingGames_data['dates']).length);
            for (let g = 0; g < Object.keys(upcomingGames_data['dates']).length; g++) {
                game_schedule_date.innerHTML += upcomingGames_data['dates'][g].date + "<br />";
                game_schedule_home_team.innerHTML += '<a href="./index.html?' + 'theme=' + document.body.className + '&teamID=' + upcomingGames_data['dates'][g].games[0].teams.home.team.id + '">' + upcomingGames_data['dates'][g].games[0].teams.home.team.name + '</a>' + "<br />";
                game_schedule_away_team.innerHTML += '<a href="./index.html?' + 'theme=' + document.body.className + '&teamID=' + upcomingGames_data['dates'][g].games[0].teams.away.team.id + '">' + upcomingGames_data['dates'][g].games[0].teams.away.team.name + '</a>' + "<br />";
                game_schedule_venue.innerHTML += upcomingGames_data['dates'][g].games[0].venue.name + "<br />";
            }
        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    upcomingGames.send();
}

function displayTeamName(teamID) {
    console.log("Hello");
    const teamNameURL = 'https://statsapi.web.nhl.com/api/v1/teams/' + teamID;
    const teamNameSched = new XMLHttpRequest();
    teamNameSched.open('GET', teamNameURL, true);
    teamNameSched.onload = function() {
        if (teamNameSched.status === 200) {
            let teamName_schedule_data = JSON.parse(teamNameSched.responseText);
            document.getElementById("team-name-schedule").innerHTML = teamName_schedule_data['teams'][0].name;

        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    teamNameSched.send();
}

const param = new URLSearchParams(window.location.href);
if (param.has("teamID")) {
    let teamID = param.get("teamID");
    createTeamDropDown();
    displayTeamsSchedule(teamID);
    displayTeamName(teamID);
    displayTeamImage(teamID);
} else {
    createTeamDropDown();
}
