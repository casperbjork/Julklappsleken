var playerListCookiegame = [];
var cookiescookiegame = document.cookie.split(";");
    for (var x = 0; x<cookiescookiegame.length; x++) {
        if (checkIfPlayer(x) === true) {
            playerListCookiegame.push(cookiescookiegame[x]);
        }
    }

function createPlayerCookie(playernum, playername) { //Creates a cookie for a player
    var currdate = new Date();
    var expiredate = currdate.setHours(currdate.getHours()+1);
    document.cookie="player"+playernum +"=" +playername +"; expires="+expiredate;
}
function checkIfPlayer(cookie) { //Check if the cookie has the value of Player
    if (cookiescookiegame.length <= cookie) {
        return false;
    } else {
        if (cookiescookiegame[cookie].substr(0, 1) === "p") {
            return true;
        }
        if (cookiescookiegame[cookie].substr(1, 1) === "p") { 
            return true;
        }
    }
    return false;
}

function checkPlayerCookie(playernum) { // Checks if the player with that number exists
    var cookies = document.cookie.split(";");
    var stringnum = playernum.toString();
    if (playernum >= 10) {
        for (var x = 10; x < cookies.length; x++){
           if (cookies[x].substr(7, 2) === stringnum) {
               return true;
           }
        }
    }
    if (cookies[0].substr(6, 1) === stringnum) {
        return true;
    }
    for (var x = 1; x < cookies.length; x++){
        if (cookies[x].substr(7, 1) === stringnum) {
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
    var stringnum = playernum.toString();
    if (playernum >= 10) {
        for (var x = 9; x <= playerListCookiegame.length; x++){
            if (playerListCookiegame[x].substr(7, 2) === stringnum) {
               playername = playerListCookiegame[x].substr(10);
               return playername;
           }
        }
    }
        if (playerListCookiegame[0].substr(6, 1) === stringnum) {
            playername = playerListCookiegame[0].substr(8);
            return playername;
        }
       
        for (var x = 1; x <= playerListCookiegame.length; x++){
            if (playerListCookiegame[x].substr(7, 1) === stringnum) {
                playername = playerListCookiegame[x].substr(9);
                return playername;
           }
        }
}

function getTime() {            //Returns the time in miliseconds
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

function removeCookies() {  //Removes any cookies on the site (just for console currently!)
    var cookies = document.cookie.split(";");
    for (var x = 0; x < cookies.length; x++) {
        document.cookie = cookies[x]+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        }
}

function amountplayers() {
    var cookies = document.cookie.split(";");
    for (var x = 1; x< cookies.length; x++) {
        if (cookies[0].substr(0,1) === "n") {
            return cookies[0].substr(11);
        }
        if (cookies[x].substr(1,1) === "n") {
            return cookies[x].substr(12);
        }
    }
}