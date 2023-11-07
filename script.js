//variabler och arrays
let count = 0;
let tries = 0;
let isGameOver = false
let storeKeyPress = [];
let wrongKeyPress = [];
let keyboardArea = document.querySelector(".keyboardArea")
let keyAreas = [];
let wordArray = ["pirat","hatt","mössor","katten","höna","blommor","skepp","sjöfart","hav"] //lägg till hur många ord som du vill
let keyArea;
let randomWord = getRandomWord();
let aboutArea = document.querySelector(".aboutArea")
let buttonYes = document.querySelector(".buttonYes")
let buttonNo = document.querySelector(".buttonNo")
//Svg elements
let hangmanFull = document.querySelector(".fullImage")
let hangmanGround = document.querySelector("#ground")
let hangmanScaffold = document.querySelector("#scaffold")
let hangmanHead = document.querySelector("#head")
let hangmanBody = document.querySelector("#body")
let hangmanArms = document.querySelector("#arms")
let hangmanLegs = document.querySelector("#legs")
//Array med delar av hangman
let hangmanArray = [hangmanGround, hangmanScaffold, hangmanHead, hangmanBody, hangmanArms, hangmanLegs]

//Functions
function getRandomWord(){   
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];

}
function createCardAreas(){
    
    //let randomNum = Math.floor(Math.random() * 8) + 1
    for(let i = 0; i<randomWord.length; i++)
    {
        //sen kan man display none på denna för spelet
        keyArea = document.createElement('div');

        keyArea.className = 'keyArea'
        
        //Detta ska visas i eventlistener senare
        keyArea.textContent = randomWord[i]
        keyArea.style.color = "white"

        keyboardArea.appendChild(keyArea);
        keyAreas.push(keyArea)
    }
    //ta bort alla element av hangman
    for (const part of hangmanArray) {
        part.style.display = "none"
        
    }
    isGameOver = false
}
function clearKeyAreas() {
    //koden för att rensa
    keyAreas.forEach((keyArea) => {
        keyArea.textContent = "";
        keyboardArea.removeChild(keyArea);
    });
    keyAreas = []
    storeKeyPress = []
    wrongKeyPress = []
    count = 0;
    tries = 0;
    aboutArea.textContent = "Start!"
    for (const part of hangmanArray) {
        part.style.display = "none"
        
    }
}

//starta spelet när sidan laddas
createCardAreas();
//eventlistener för key
document.addEventListener("keypress", (e) => {

    if (!storeKeyPress.includes(e.key) && isGameOver == false) {
        //pusha bokstaven till arrayen
        storeKeyPress.push(e.key);

        let matchFound = false;

        //loopa igenom alla keyAreas
        for(let i = 0; i < keyAreas.length; i++) {
            //om tangenttrycket matchar texten i keyArea
            if(e.key == keyAreas[i].textContent && count < keyAreas.length) {
                keyAreas[i].style.color = "black";
                count++;
                matchFound = true;

                aboutArea.textContent = `Den fanns! försök ${tries}/6`
                console.log("counter:",count)
            }
        }

          //om ingen matchning hittades
        if (!matchFound) {
            tries++;
            //visa kroppsdel av hangedman
            wrongKeyPress.push(e.key)
            hangmanArray[tries-1].style.display = "block"
            aboutArea.textContent = `"${wrongKeyPress}" finns inte! försök ${tries}/6`
            console.log("Tries:", tries);
        }

        //kontrollera om spelet är vunnet
        if (count == keyAreas.length){
            isGameOver = true
            console.log("Du vann! spela igen?")
            aboutArea.textContent = "Du vann! spela igen?"
            //visa knapparna
            buttonYes.style.display = "block"
        }
        //kontrollera om spelet är förlorat
        if (tries == 6) {
            for (const part of hangmanArray) {
                part.style.display = "block"
            }
            console.log("Du förlorade... spela igen?")

            isGameOver = true

            //säg vad det hela ordet är
            let wholeWord = keyAreas.map(area => area.textContent).join('');
            aboutArea.textContent = `Ordet var: "${wholeWord}"! Du förlorade, spela igen?`
            //visa restart knapp
            buttonYes.style.display = "block"
        }      
    }
});
buttonYes.addEventListener("click", () =>{

        clearKeyAreas()
        randomWord = getRandomWord();
        createCardAreas();
        buttonYes.style.display = "none"
        buttonNo.style.display = "none"
})
