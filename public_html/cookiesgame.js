var cookies = document.cookie.split(";");
var playerList = [];
for (var x = 0; x<cookies.length; x++) {
    if (checkIfPlayer(x) === true) {
        playerList.push(cookies[x]);
    }
}

function createPlayerCookie(playernum, playername) { //Creates a cookie for a player
    var currdate = new Date();
    var expiredate = currdate.setHours(currdate.getHours()+1);
    document.cookie="player"+playernum +"=" +playername +"; expires="+expiredate;
}
function checkIfPlayer(cookie) { //Check if the cookie has the value of Player
    var cookies = document.cookie.split(";");
    if (cookies[cookie].substr(0, 1) === "p") {
        return true;
    }
    if (cookies[cookie].substr(1, 1) === "p") { 
        return true;
    }
    return false;
}

function checkPlayerCookie(playernum) { // Checks if the player with that number exists
    var cookies = document.cookie.split(";");
    if (playernum >= 10) {
        for (var x = 10; x < cookies.length; x++){
           if (cookies[x].substr(7, 2) == playernum) {
               return true;
           }
        }
    }
    if (cookies[0].substr(6, 1) == playernum) {
        return true;
    }
    for (var x = 1; x < cookies.length; x++){
        if (cookies[x].substr(7, 1) == playernum) {
           return true;
       }
   }
       return false;
}

function checkPlayerName(playername) {  //Check if the playername is already taken
    var cookies = document.cookie.split(";");
        if (cookies[0].substr(8) === playername) {
            return true;
        }
 
       for (var x = 1; x < cookies.length; x++){
           if (cookies[x].substr(9) === playername) {
               return true;
           } else {
               
           }
        }
    return false;
}

function getPlayerName(playernum) { // Returns players name for that number (if it exists)
    var playername = " ";
    if (playernum >= 10) {
        for (var x = 10; x < playerList.length; x++){
           if (playerList[x].substr(7, 2) == playernum) {
               playername = playerList[x].substr(10);
               return playername;
           }
        }
    }
        if (playerList[0].substr(6, 1) == playernum) {
            playername = playerList[0].substr(8);
            return playername;
        }
       for (var x = 1; x < playerList.length; x++){
           if (playerList[x].substr(7, 1) == playernum) {
               playername = playerList[x].substr(9);
               return playername;
           }
        }
}

function getTime() {
    var cookies = document.cookie.split(";");
    for (var x = 1; x < cookies.length; x++) {
        if (cookies[0].substr(0,1) === "t") {           
            return cookies[0].substr(5);
        }
        if (cookies[x].substr(1,1)=== "t") {
            return cookies[x].substr(6);
        }
    }
}