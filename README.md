# Gymnasiearbete

function turns() {
            roundsLeft = Math.floor((15+Math.random()*15));
            window.alert("Nu starta nedräkningen "+ "("+ roundsLeft + ")");
            document.getElementById("phase2").style.visibility = "hidden";
        }


var setting_timer = 0;
var setting_numbplayer = 0;

function startgame(setting_timer, setting_numbplayer) {
    if (setting_timer === 1) {
        turns();
    } else {
        timer();
    }
    
    document.getElementById("test").innerHTML ="setting_numbplayer";
}
