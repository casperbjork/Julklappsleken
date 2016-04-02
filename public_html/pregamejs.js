var playerList = [];
var text = [" - ", "Sista steget innan vi kan börja spela. <br /> <br /> Välj en tid som ni vill spela runt. Datorn kommer att sätta en specifik tid som ingen får veta. <br /> <br /> När ni känner er klara så klickar ni på <b>Börja spela</b> knappen.", 
            "Nu skriver ni in ett namn för varje spelare, tänk på att inte använda några åäö eller andra tecken som inte finns med i alpabetet." ];
var input;
var cookies = document.cookie.split(";");

function submitnumplayers(){                       //Will submit the amount of players to the playerSetting while checking any errors.
    input = document.getElementById("inputnumplayers").value;
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
    document.getElementById("confirmplayers").style.display = "inline";     
}


function playerSetting(numplayers){     //Creates a well(box) with a input and an ID. Needs a number
    playerList = [];
    cookies = document.cookie.split(";");
        for (var x = 0; x<=cookies.length; x++) {
            if (checkIfPlayer(x) === true) {
                playerList.push(cookies[x]);
            }   
        }
    clearPlayerSetting();
    for (var x=1; x<=numplayers; x++) {
    
        var well = document.createElement("div");       //creates a div with the class well
        well.className = "well";
        well.className += " well-group";
        well.id ="player"+x;
        
            var p = document.createElement("p");                            //creates a text 
            var text = document.createTextNode("Spelaren "+ x +":");
            p.appendChild(text);
            p.id ="playername"+x;
            well.appendChild(p);
        
        var inputDiv = document.createElement("div");                    //Creates the div for input
        
            var namefield = document.createElement("input");            //Creates the input
            namefield.className = "form-control";
            namefield.type = "text";
            namefield.placeholder = "Ditt namn";
            namefield.id="playerinput"+x;

                    inputDiv.appendChild(namefield);                   //Complets the div
                    well.appendChild(inputDiv);
             
        var element = document.getElementById("playerscreen");  
        element.appendChild(well);                                     //Puts the div on the screen
    }
    if (playerList.length >= numplayers) {
        for (var x = 1; x <= numplayers; x++) {          //Checks if cookies already exist and if so it replaces the default player name
            var cookieexist = checkPlayerCookie(x);
            var cookieplayer = checkIfPlayer(x-1);
            if (cookieplayer === true) {
                if (cookieexist === true) {
                    var name = getPlayerName(x);
                    var text = document.createElement("p");
                    text.innerHTML = name;
                    document.getElementById("player"+x).replaceChild(text, document.getElementById("player"+x).firstChild);
                }
            }
        }
    } else {    
        for (var x = 1; x <= playerList.length; x++) {          //Checks if cookies already exist and if so it replaces the default player name
            var cookieexist = checkPlayerCookie(x);
            var cookieplayer = checkIfPlayer(x-1);
            if (cookieplayer === true) {
                if (cookieexist === true) {
                    var name = getPlayerName(x);
                    var text = document.createElement("p");
                    text.innerHTML = name;
                    document.getElementById("player"+x).replaceChild(text, document.getElementById("player"+x).firstChild);
                }
            }
        }
    }
    document.getElementById("infoTextPreGame").innerHTML = text[2];
}

function clearPlayerSetting() {                                         //Clears the screen of any objects   
    var div = document.getElementById("playerscreen");
    
        while (div.hasChildNodes()) {
            div.removeChild(div.lastChild);
        }
}

function confirmNames() {                                               //Creates a cookie for each player that has inputed thier name
    var playeramount = document.getElementById("playerscreen").children;
    var alertText = document.getElementById("inputAlertS1");
    var alertTextDiv = document.getElementById("inputAlertS1Div");
    for (var x = 1; x<=playeramount.length; x++) {
        var inputtext = document.getElementById("playerinput"+x).value;
        if (inputtext === ""){
        } else {
            var namecheck = checkPlayerName(inputtext);
            if (namecheck === false) {
                createPlayerCookie(x, inputtext);
                var text = document.createElement("p");
                text.innerHTML = inputtext;
                document.getElementById("player"+x).replaceChild(text, document.getElementById("player"+x).firstChild);
                alertTextDiv.style.display = "none";
            } else {
                alertTextDiv.style.display = "block";
                alertText.innerHTML = "Det finns redan en spelare som vid namnet "+ inputtext;
            }
        }
    document.getElementById("stage2div").style.display = "block";
    window.location.href = "#player1";
    var confirmbtn = document.getElementById("confirmplayersbtn");
    confirmbtn.className - " btn-success";
    confirmbtn.className += " btn-warning";
    }
}
function timecookie() {                                             //Creates a cookie for the time that is given. also converts it to miliseconds
    var alertText = document.getElementById("inputAlertS1");
    var alertTextDiv = document.getElementById("inputAlertS1Div");
    var inputtimevalue = document.getElementById("timeinput").value;
        try {
            if (isNaN(inputtimevalue)) throw "Måste vara en siffra";
            if (inputtimevalue === 0) throw "Måste vara mer än 4 minuter";
            if (inputtimevalue <= 4) throw "Måste vara mer än 4 minuter";
        } catch(e) {
            alertTextDiv.style.display = "block";
            alertText.innerHTML = e;
            return "";
        }
    var text = document.createElement("p");
        text.innerHTML = "Spelet kommer att vara runt "+inputtimevalue+" minuter långt."; 
    
    document.getElementById("timewell").replaceChild(text, document.getElementById("timewell").firstChild);
    alertTextDiv.style.display = "none";
    inputtimevalue = randomizeTime(Number(inputtimevalue));
    var timevalue = (inputtimevalue*60)*1000;
    var currdate = new Date();
    var expiredate = currdate.setHours(currdate.getHours()+1);
    document.cookie="time="+timevalue+"; expires="+expiredate;
}

function stage2() {                                                             //Goes to the stage two (time selection)
    document.getElementById("StartGame").style.display = "block";
    clearPlayerSetting();
    document.getElementById("stage1pre").style.display = "none";
    document.getElementById("stage2div").style.display = "none";
    document.getElementById("confirmplayersbtn").style.display = "none";
    document.getElementById("infoTextPreGame").innerHTML = text[1];
    
    var well = document.createElement("div");       //Creates a div with the class well
        well.className="well";
        well.className +=" well-group";
        well.id ="timewell";
    
        var p = document.createElement("p");                            //Creates a text 
        var textnode = document.createTextNode("Välj den ungefära tiden");
            p.appendChild(textnode);
            well.appendChild(p);
            
        var inputBtnDiv = document.createElement("div");                    //Creates the div for the input
        inputBtnDiv.className = "input-group";
        inputBtnDiv.className += " input-group-lg";
        
            var inputSpan = document.createElement("span");                 //Creates a span
            inputSpan.className = "input-group-btn";
        
                var inputBtn = document.createElement("button");           //Creates a botton
                inputBtn.className = "btn";
                inputBtn.className += " btn-default";
                inputBtn.type = "button";
                inputBtn.id ="timebtn";                
                var inputBtnText = document.createTextNode("Välj tid");
                inputBtn.appendChild(inputBtnText);
                   
            var namefield = document.createElement("input");            //Creates the inputfield
            namefield.className = "form-control";
            namefield.type = "text";
            namefield.placeholder = "Antal minuter";
            namefield.id = "timeinput";
            
            inputSpan.appendChild(inputBtn);
                inputBtnDiv.appendChild(namefield);                   //Complets the div.
                inputBtnDiv.appendChild(inputSpan);
                well.appendChild(inputBtnDiv);
            document.getElementById("playerscreen").appendChild(well);
            document.getElementById("timebtn").addEventListener("click", function(){    //Gives the button a onclick funtion
               timecookie();
            });
        var currdate = new Date();
        var expiredate = currdate.setHours(currdate.getHours()+1);
        document.cookie="numplayers="+input+"; expires="+expiredate;
}

function startgame() {              //Redirects the user to the final game screen.
    var cookies = document.cookie.split(";");
    for (var x = 1; x < cookies.length; x++) {
        if (cookies[0].substr(0, 1) === "t") {
            document.getElementById("inputAlertS1Div").style.display = "none";
            window.location.href = "game.html";
        }
        if (cookies[x].substr(1, 1) === "t") {
            document.getElementById("inputAlertS1Div").style.display = "none";
            window.location.href = "game.html";
        }
    }
    var alertText = document.getElementById("inputAlertS1");
    document.getElementById("inputAlertS1Div").style.display = "block";
    alertText.innerHTML = "Du måste ange en tid!";
}

function randomizeTime(value) {     //Adds or removes some minuets from the given number 
    var newTime = 0;
    var decider = Math.floor(1+Math.random()*2);
    if (decider === 1) {    
        newTime = value+(Math.floor(1+Math.random()*4));
    } else {
        newTime = value-(Math.floor(1+Math.random()*2));
    }
    return newTime;
}
//Reminder / TODO:
//Skapa också en knapp som tar bort cookien.