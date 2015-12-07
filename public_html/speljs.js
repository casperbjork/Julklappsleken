/* 
 * Copyright (C) Error: on line 4, column 33 in Templates/Licenses/license-gpl30.txt
 The string doesn't match the expected date/time format. The string to parse was: "2015-apr-08". The expected format was: "MMM d, yyyy". Casper
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var phase = 1;
var roundsLeft = 1;
var dice = 1;
var currentRound = 0;

function diceroll() {
    dice = Math.floor((1+Math.random()*6));
    document.getElementById("dice").innerHTML = dice;
  
    if (phase === 2) {
        currentRound++;
        
            if (roundsLeft === currentRound) {
                document.getElementById("action").innerHTML = "Spelet är över.";
                window.alert("Spelet är över.");
                phase = 1;
            }
        
        switch (dice) {
            case 2:
                document.getElementById("action").innerHTML = FiveTwoRule();
            break;
            
            case 5:
                document.getElementById("action").innerHTML = FiveTwoRule();
            break;
            
        default : 
            document.getElementById("action").innerHTML = "-";
        }
    }
}

function FiveTwoRule() {
    var rule = ["-",
        "Alla skickar ett paket åt höger.",
        "Du ger alla dina paket till personen som sitter tre steg åt höger.",
        "Alla skickar alla sina paket ett steg åt höger.",
        "Du ska ge ett paket till någon som inget har.",
        "Du får ta ett paket från valfri person.",
        "Du ger bort ett av dina paket till en kompis."];
    var roll = Math.floor((1+Math.random()*6));
    return rule[roll];
}


function phase2() {
 var x = confirm("Vill du gå över till fas 2?");
 if (x === true) {
    phase = 2;
        if (phase === 2) {
            roundsLeft = Math.floor((15+Math.random()*15));
            window.alert("Nu starta nedräkningen "+ "("+ roundsLeft + ")");
            document.getElementById("phase2").style.visibility = "hidden";
        }
    }
}
//test