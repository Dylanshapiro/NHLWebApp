'use strict'
let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

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


let defaultOption = document.createElement('option');
defaultOption.text = 'Choose a Team';
defaultOption.classList.add('option');

dropdown.add(defaultOption);
dropdown.selectedIndex;

const url = 'https://statsapi.web.nhl.com/api/v1/teams';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
    if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        console.log(data['teams']);
        data = data['teams'];
        let option;
        for (let i = 0; i < data.length-1; i++) {
            option = document.createElement('option');
            option.text = data[i].name;
            option.classList.add('option');
            option.value = data[i].id;
            dropdown.add(option);
        }
    } else {
        // Reached the server, but it returned an error
        console.log("Test");
    }
}
request.send();

const param = new URLSearchParams(window.location.href);
if (param.has("teamID")) {
    let team = param.get("teamID");
    displayTeamInfo(team);
    displayLogo(team);
}

function displayTeamInfo(team) {
    const nameURL = 'https://statsapi.web.nhl.com/api/v1/teams/' + team;
    const teamName = new XMLHttpRequest();
    teamName.open('GET', nameURL, true);
    teamName.onload = function() {
        if (teamName.status === 200) {
            let teamName_data = JSON.parse(teamName.responseText);
            document.getElementById("team-name").innerHTML = teamName_data['teams'][0].name;
            document.getElementById("team-venue").innerHTML = 'Home Venue: ' + teamName_data['teams'][0].venue.name + ', ' + teamName_data['teams'][0].venue.city;
        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    teamName.send();



    //Will Display Stats of selected team
    const statsURL = 'https://statsapi.web.nhl.com/api/v1/teams/' + team + '?expand=team.stats';
    const stats = new XMLHttpRequest();
    stats.open('GET', statsURL, true);
    stats.onload = function() {
        if (stats.status === 200) {
            let stats_data = JSON.parse(stats.responseText);
            document.getElementById("team-wins").innerHTML = 'Team Wins: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.wins;
            document.getElementById("team-losses").innerHTML = 'Team Losses: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.losses;
            document.getElementById("team-ot-losses").innerHTML = 'Team OT Losses: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.ot;
            document.getElementById("power-plays-goals").innerHTML = 'Power Play Goals: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.powerPlayGoals;
            document.getElementById("power-play-goals-against").innerHTML = 'Power Play Goals Against: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.powerPlayGoalsAgainst;
            document.getElementById("power-play-percent").innerHTML = 'Power Play Percentange: ' + stats_data['teams'][0].teamStats[0].splits[0].stat.powerPlayPercentage + '%';

            console.log(stats_data);
        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    stats.send();

    //Displays the roster of the selected Team including the players name, player's number, and player's position. This will also include a link to the Player's page.
    const rosterURL = 'https://statsapi.web.nhl.com/api/v1/teams/' + team + '/roster';
    const rosters = new XMLHttpRequest();
    rosters.open('GET', rosterURL, true);
    rosters.onload = function() {
        if (rosters.status === 200) {
            let roster_data = JSON.parse(rosters.responseText);
            console.log(roster_data);
            document.getElementById("team-roster").innerHTML = 'Roster';
            document.getElementById("team-roster-info-1").innerHTML = 'Name';
            document.getElementById("team-roster-info-2").innerHTML = 'Number';
            document.getElementById("team-roster-info-3").innerHTML = 'Position';

            var team_player = document.getElementById("team-player");
            var player_num = document.getElementById("player-num");
            var player_position = document.getElementById("player-position");
            // setting it to an empty string will clear out the innerHTML if another team is selected
            team_player.innerHTML = "";
            player_num.innerHTML = "";
            player_position.innerHTML = "";
            console.log(Object.keys(roster_data['roster']).length);
            for (let p = 0; p < Object.keys(roster_data['roster']).length; p++) {
                team_player.innerHTML += '<a href="./NHLPeople.html?' + 'theme=' + document.body.className + '&teamID=' + team + '&playerID=' + roster_data['roster'][p].person.id + '">' + roster_data['roster'][p].person.fullName + '</a>' + "<br />";
                player_num.innerHTML += roster_data['roster'][p].jerseyNumber + "<br />";
                player_position.innerHTML += roster_data['roster'][p].position.name + ' (' + roster_data['roster'][p].position.type + ")" + "<br />";
            }
        } else {
            // Reached the server, but it returned an error
            console.log("Test");
        }
    }
    rosters.send();
}


//This function will get the info of the team selected in the dropdown. It will provide the user with
// information such as Team Name, Team Stats, Team Roster, Team Logo, Team Venue and the Team's Upcoming games.
// Team Stats include: Team Wins, Team Losses, Team OT Losses, PP (Power Play) Goals, PP Goals Against, & PP Percentage
// Team Roster will include: Player Name, Jersey Number, Position, and Position Type.
function getTeam() {
    var x = document.getElementById("locality-dropdown");
    let team = x.options[x.selectedIndex].value;
    console.log(team);
    displayTeamInfo(team);
}
    // Displays name of Team selected

function displayLogo(team) {
    var teamLogo = document.createElement('img');
    teamLogo.src = logoDict[team];
    document.getElementById('team-logo').src = logoDict[team];
}

function getLogo() {
    var x = document.getElementById("locality-dropdown");
    let team = x.options[x.selectedIndex].value;
    // let teamVenue = x.options[0].venue;
    //console.log(team);
    // console.log(teamVenue);
    // console.log(logoDict[team]);
    displayLogo(team);
}

request.onerror = function() {
    console.error('An error occurred fetching the JSON from ' + url);
};