var gameover = false;
var turn = 1;
var cookies = document.cookie.split(";");
var playerList = [];
var numplayers = amountplayers();
for (var x = 0; x<=cookies.length; x++) {
    if (checkIfPlayer(x) === true) {
        playerList.push(cookies[x]);
    }
}
document.getElementById("playerturn").innerHTML = "Det är "+getPlayerName(1)+"s tur"; //Displays the first player to go.

function dice() {   //Returns a number between 1-6
   var dice = Math.floor((1+Math.random()*6));
   return dice;
}

function FiveTwoRule() {            //Returns a execution for a rule
    var random = dice();
    var rule = ["-",
        "Alla skickar ett paket åt höger.",
        "Du ger alla dina paket till personen som sitter tre steg åt höger.",
        "Alla skickar alla sina paket ett steg åt höger.",
        "Du ska ge ett paket till någon som inget har.",
        "Du får ta ett paket från valfri person.",
        "Du ger bort ett av dina paket till en kompis."];
    return rule[random];
}

function diceroll() {                   //Gets called when the dice is "rolled"
    if(gameover === false) {
        var roll = dice();
        displayPlayer();
        document.getElementById("dice").innerHTML = roll;
        if ((document.getElementById("Actionwell").style.display) === "block") {
            if (roll === 2 || roll === 5) {
            document.getElementById("action").innerHTML = FiveTwoRule();
            } else {
            document.getElementById("action").innerHTML = "-";
            }
        }
        document.getElementById("gamestart").style.display = "none";
    }
}

function displayPlayer() {          //Displayes the player which has "rolled" the dice and the next player to "roll"
    if ((turn+1) > numplayers) {
        document.getElementById("playerturn").innerHTML = getPlayerName(turn)+" har slagit. Nästa är "+getPlayerName(1);
    } else {
        document.getElementById("playerturn").innerHTML = getPlayerName(turn)+" har slagit. Nästa är "+getPlayerName(turn+1);
    }
    turn++;
    if (turn > numplayers) {
        turn = 1;
    }
}

function startTimer() {           //Starts the timer
    setTimeout(gameOver, getTime());
    document.getElementById("Actionwell").style.display = "block";
    document.getElementById("starttimerbtn").style.display = "none";
    document.getElementById("gamestart").style.display = "block";
}

function gameOver() {           //Ends the game and will return the player to the homepage
    gameover = true;
    document.getElementById("action").innerHTML = "Spelet är över. Tack för att ni spelat.";
    document.getElementById("gamestart").innerHTML = "Spelet är över, går tillbaka till startsidan om 5 sekunder...";
    document.getElementById("gamestart").style.display = "block";
    setTimeout(function(){window.location.href = "index.html";}, 5000);
    console.log("Game over!");
}
