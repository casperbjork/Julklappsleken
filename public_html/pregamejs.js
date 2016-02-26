//Cookie skapare... 

var text = ["Sista steget innan vi kan börja spela. <br /> <br /> Välj en tid som ni vill spela runt. Datorn kommer att sätta en specifik tid som ingen får veta. <br /> <br /> När ni känner er klara så klickar ni på <b>Börja spela</b> knappen."];


function submitnumplayers(){
    var input = document.getElementById("inputnumplayers").value;
    var alertText = document.getElementById("inputAlertS1");
    var alertTextDiv = document.getElementById("inputAlertS1Div");
        try {                                                          
            if (input === "0") throw "Du måste ha minst två spelare.";
            if (input === "1") throw "Du måste ha minst två spelare.";
            if (input === "") throw "Rutan är tom.";
            if (isNaN(input)) throw "Du måste använda siffror för att skriva in antalet spelare.";
            if (input>100) throw "Det blir inte bra att ha över 100 personer som spelar, om du verkligen vill kontakta mig...";
        }
        catch(e) {
            alertTextDiv.style.display = "block";
            alertText.innerHTML = e;
            return "";
        }
        
    playerSetting(input);
    alertTextDiv.style.display = "none";
    document.getElementById("steg1").innerHTML = "Uppdatera";
    document.getElementById("stage2div").style.display = "inline";     
}


function playerSetting(numplayers){
    clearPlayerSetting();
    for (var x=1; x<=numplayers; x++) {
    
        var well = document.createElement("div");       //skapar en div well
        well.className = "well";
        well.className += " well-group";
        well.id ="player"+x;
        
            var p = document.createElement("p");                            //skapar text 
            var text = document.createTextNode("Spelaren "+ x +":");
            p.appendChild(text);
            p.id ="playername"+x;
            well.appendChild(p);
        
        var inputBtnDiv = document.createElement("div");                    //skapar hela inputen
        inputBtnDiv.className = "input-group";
        inputBtnDiv.className += " input-group-lg";
        
            var inputSpan = document.createElement("span");                 //skapar span
            inputSpan.className = "input-group-btn";
        
                var inputBtn = document.createElement("button");           //skapar knapppen
                inputBtn.className = "btn";
                inputBtn.className += " btn-default";
                inputBtn.type = "button";
                inputBtn.id ="playerBtn"+x;                
                var inputBtnText = document.createTextNode("Ok");
                inputBtn.appendChild(inputBtnText);
                   
            var namefield = document.createElement("input");            //skapar inputfältet
            namefield.className = "form-control";
            namefield.type = "text";
            namefield.placeholder = "Ditt namn";
            namefield.id="playerinput"+x;

                    inputSpan.appendChild(inputBtn);
                    inputBtnDiv.appendChild(namefield);                   //sätter ihop hela inputen.
                    inputBtnDiv.appendChild(inputSpan);

                    well.appendChild(inputBtnDiv);
             
        var element = document.getElementById("playerscreen");
        element.appendChild(well);
        document.getElementById("playerBtn"+x).addEventListener("click", function(){
            okName(this);
        });
    }
    var cookies = document.cookie.split(";");
    for (var x = 0; x < cookies.length; x++) {
        var cookieexist = checkPlayerCookie(x+1);
        console.log(x+1);
        if (cookieexist === true) {
            var name = getPlayerName(x+1);
            console.log(name);
            var text = document.createElement("p");
            text.innerHTML = name; 

            document.getElementById("player"+(x+1)).replaceChild(text, document.getElementById("player"+(x+1)).firstChild);

        }
    }     
}

function createPlayerCookie(playernum, playername) {
    var currdate = new Date();
    var expiredate = currdate.setHours(currdate.getHours()+1);
    document.cookie="player"+playernum +"=" +playername +"; expires="+expiredate;
}

function checkPlayerCookie(playernum) {
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

function checkPlayerName(playername) {
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

function getPlayerName(playernum) {
    var cookies = document.cookie.split(";");
    var playername = " ";
    if (playernum >= 10) {
        for (var x = 10; x < cookies.length; x++){
           if (cookies[x].substr(7, 2) == playernum) {
               playername = cookies[x].substr(10);
               return playername;
           }
        }
    }
        if (cookies[0].substr(6, 1) == playernum) {
            playername = cookies[0].substr(8);
            return playername;
        }
       for (var x = 1; x < cookies.length; x++){
           if (cookies[x].substr(7, 1) == playernum) {
               playername = cookies[x].substr(9);
               return playername;
           }
        }
}


function clearPlayerSetting() {                               
    var div = document.getElementById("playerscreen");
    
        while (div.hasChildNodes()) {
            div.removeChild(div.lastChild);
        }
}

function okName(btn) {
    var alertText = document.getElementById("inputAlertS1");
    var alertTextDiv = document.getElementById("inputAlertS1Div");
    var clickbtn = btn.id;
    var player = clickbtn.substr(9);
    var inputtext = document.getElementById("playerinput"+player).value;
    var namecheck = checkPlayerName(inputtext);
        if (namecheck === true) {
            alertTextDiv.style.display = "block";
            alertText.innerHTML = "Det finns redan en spelare som heter "+ inputtext;
            return "";
        }
    createPlayerCookie(player, inputtext);
    alertTextDiv.style.display = "none";
    var text = document.createElement("p");
        text.innerHTML = inputtext; 
    
    document.getElementById("player"+player).replaceChild(text, document.getElementById("player"+player).firstChild);
}

function stage2() {
    clearPlayerSetting();
    document.getElementById("stage1pre").style.display = "none";
    document.getElementById("stage2div").style.display = "none";
    
        document.getElementById("infoTextPreGame").innerHTML = text[0];
}

//Skapa function som lägger tillbaka spelarna vid återanslutning, Skapa också en knapp som tar bort cookien.
//Cookien ska fylla i allt för dem.