// todo  Generator för den unika spelare med "bilder" o namn...  Cookie skapare... 

function submitnumplayers(){
    var input = document.getElementById("inputnumplayers").value;
    var alertText = document.getElementById("inputAlertS1");
    var alertTextDiv = document.getElementById("inputAlertS1Div");
        try {                                                          
            if (input === "0") throw "Du måste ha minst två spelare.";
            if (input === "1") throw "Du måste ha minst två spelare.";
            if (input === "") throw "Rutan är tom.";
            if (isNaN(input)) throw "Du måste använda siffror för att skriva in antalet spelare.";
        }
        catch(e) {
            alertTextDiv.style.display = "block";
            alertText.innerHTML = e;
            return "";
        }
        
    playerSetting(input);
    alertTextDiv.style.display = "none";
    document.getElementById("steg1").innerHTML = "Uppdatera";
    document.getElementById("steg2div").style.display = "inline";     
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
}


function clearPlayerSetting() {                               
    var div = document.getElementById("playerscreen");
    
        while (div.hasChildNodes()) {
            div.removeChild(div.lastChild);
        }
}

function okName(btn) {
    var clickbtn = btn.id;
    var player = clickbtn.substr(9);
    var inputtext = document.getElementById("playerinput"+player).value;
    var text = document.createElement("p");
        text.innerHTML = inputtext; 
    
    document.getElementById("player"+player).replaceChild(text, document.getElementById("player"+player).firstChild);
        
    
}