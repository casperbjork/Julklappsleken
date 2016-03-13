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
        
                var inputBtn = document.createElement("button");           //skapar knappen
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
        var cookieplayer = checkIfPlayer(x);
        if (cookieplayer === true) {
            if (cookieexist === true) {
                var name = getPlayerName(x+1);
                var text = document.createElement("p");
                text.innerHTML = name;
                document.getElementById("player"+(x+1)).replaceChild(text, document.getElementById("player"+(x+1)).firstChild);
            }
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
function timecookie() {
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

function stage2() {
    document.getElementById("StartGame").style.display = "block";
    clearPlayerSetting();
    document.getElementById("stage1pre").style.display = "none";
    document.getElementById("stage2div").style.display = "none";
    document.getElementById("infoTextPreGame").innerHTML = text[0];
    
    var well = document.createElement("div");       //skapar welln
        well.className="well";
        well.className +=" well-group";
        well.id ="timewell";
    
        var p = document.createElement("p");                            //skapar text 
        var textnode = document.createTextNode("Välj den ungefära tiden");
            p.appendChild(textnode);
            well.appendChild(p);
            
        var inputBtnDiv = document.createElement("div");                    //skapar hela inputen
        inputBtnDiv.className = "input-group";
        inputBtnDiv.className += " input-group-lg";
        
            var inputSpan = document.createElement("span");                 //skapar span
            inputSpan.className = "input-group-btn";
        
                var inputBtn = document.createElement("button");           //skapar knappen
                inputBtn.className = "btn";
                inputBtn.className += " btn-default";
                inputBtn.type = "button";
                inputBtn.id ="timebtn";                
                var inputBtnText = document.createTextNode("Välj tid");
                inputBtn.appendChild(inputBtnText);
                   
            var namefield = document.createElement("input");            //skapar inputfältet
            namefield.className = "form-control";
            namefield.type = "text";
            namefield.placeholder = "Antal minuter";
            namefield.id = "timeinput";
            
            inputSpan.appendChild(inputBtn);
                inputBtnDiv.appendChild(namefield);                   //sätter ihop hela inputen.
                inputBtnDiv.appendChild(inputSpan);
                well.appendChild(inputBtnDiv);
            document.getElementById("playerscreen").appendChild(well);
            document.getElementById("timebtn").addEventListener("click", function(){
               timecookie();
            });
}

function startgame() {
    window.location.href = "game.html";
}

function randomizeTime(value) {
    var newTime = 0;
    var decider = Math.floor(1+Math.random()*2);
    if (decider === 1) {    
        newTime = value+(Math.floor(1+Math.random()*4));
    } else {
        newTime = value-(Math.floor(1+Math.random()*2));
    }
    return newTime;
}

//Skapa också en knapp som tar bort cookien.