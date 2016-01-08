// todo  Generator för den unika spelare med "bilder" o namn...  Cookie skapare... 

function playerSetting(){
    
        var well = document.createElement("div");       //skapar en div well
        well.className = "well";        
        
            var p = document.createElement("p");                            //skapar text 
            var text = document.createTextNode("Spelarens namn :");
            p.appendChild(text);
            well.appendChild(p);
        
        var inputBtnDiv = document.createElement("div");                    //skapar hela inputen
        inputBtnDiv.className = "input-group";
        
            var inputSpan = document.createElement("span");                 //skapar span
            inputSpan.className = "input-group-btn";
        
                var inputBtn = document.createElement("button");           //skapar knapppen
                inputBtn.className = "btn";
                inputBtn.className += " btn-default";
                inputBtn.type = "button";
                var inputBtnText = document.createTextNode("Ok");
                inputBtn.appendChild(inputBtnText);
                   
            var namefield = document.createElement("input");            //skapar inputfältet
            namefield.className = "form-control";
            namefield.type = "text";
            namefield.placeholder = "Ditt namn";

                    inputSpan.appendChild(inputBtn);                   //sätter ihop hela inputen.
                    inputBtnDiv.appendChild(inputSpan);
                    inputBtnDiv.appendChild(namefield);
            well.appendChild(inputBtnDiv);
              
        var element = document.getElementById("test");
        element.appendChild(well);
}
