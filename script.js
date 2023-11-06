let count = 0;
let tries = 0;
let storeKeyPress = [];
let keyboardArea = document.querySelector(".keyboardArea")
let keyAreas = [];
let wordArray = ["pirat","hatt","mössorna","katten","ön"]
let keyArea;
let randomWord = getRandomWord();
let aboutArea = document.querySelector(".aboutArea")
let buttonYes = document.querySelector(".buttonYes")
let buttonNo = document.querySelector(".buttonNo")


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
}
function clearKeyAreas() {
    // Här kommer vi att skriva koden för att rensa keyAreas.
    keyAreas.forEach((keyArea) => {
        keyArea.textContent = "";
        keyboardArea.removeChild(keyArea);
    });
    keyAreas = []
    storeKeyPress = []
    count = 0;
    tries = 0;
    aboutArea.textContent = "Start!"
}

//starta spelet när sidan laddas
createCardAreas();

//eventlistener för key
document.addEventListener("keypress", (e) => {

    // Kontrollera om bokstaven redan har blivit tryckt
    if (!storeKeyPress.includes(e.key)) {
        // Lägg till bokstaven i arrayen
        storeKeyPress.push(e.key);

        let matchFound = false;

        // Loopa igenom alla keyAreas
        for(let i = 0; i < keyAreas.length; i++) {
            // Om tangenttrycket matchar texten i keyArea, ändra färg
            if(e.key == keyAreas[i].textContent && count < keyAreas.length) {
                keyAreas[i].style.color = "black"; // Byt till den färg du vill ha
                count++;
                matchFound = true;

                aboutArea.textContent = `Den fanns! försök ${tries}/5`
                console.log("counter:",count)
            }
        }

          // Om ingen matchning hittades, öka misses
        if (!matchFound) {
            tries++;
            aboutArea.textContent = `Den finns inte! försök ${tries}/5`
            console.log("Tries:", tries);
        }

        // Kontrollera om spelet är vunnet utanför loopen 
        if (count == keyAreas.length){
            console.log("Du vann! spela igen?")
            aboutArea.textContent = "Du vann! spela igen?"
            //visa knapparna
            buttonYes.style.display = "block"
            //sbuttonNo.style.display = "block"
        }
        // Kontrollera om spelet är förlorat utanför loopen
        if (tries == 5) {
            console.log("Du förlorade... spela igen?")
            aboutArea.textContent = "Du förlorade... spela igen?"
            //visa knapparna
            buttonYes.style.display = "block"
            //buttonNo.style.display = "block"
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
