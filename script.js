let wordToGuess;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const words = data.words;
            const randomIndex = getRandomInt(0, words.length - 1);
            const randomWordObject = words[randomIndex];

            console.log(randomWordObject);

            const category = document.getElementById('category');
            category.textContent = randomWordObject.category;
            const gameDiv = document.getElementById('word');
            wordToGuess = randomWordObject.word;
            for (let i = 0; i < wordToGuess.length; i++) {
                let wordElement = document.createElement('p');
                wordElement.textContent = wordToGuess[i];
                gameDiv.appendChild(wordElement);
            }

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const buttons = document.querySelector("#letters");
let Chance = 0, score=0;
    buttons.addEventListener("click", (e) => {
        let correct = 0;
        if (e.target.textContent.length ===1){
        const letterClicked = e.target.textContent;
        let word = document.getElementsByTagName("p");
            for (let i = 0; i < word.length; i++) {
               let letter = word[i];
               if(letter.textContent.toUpperCase() == letterClicked){
                word[i].style.color = "black";
                   score++;
                   correct = 1; 
               } 
                if(correct){
                   e.target.style.background = "green";
                    if (score == word.length){
                        const elementToShow = document.querySelector(".result");
                        const resText = document.querySelector(".resultText");
                        resText.textContent = ` Congrats!! but you have made ${Chance} mistakes :`;
                        elementToShow.classList.remove("hide"); 
                        buttons.classList.add("hide"); 
                    }} 
                    else {e.target.style.background = "red"; }   
                 }
            if (!correct){
                Chance++;
                const elementToShow = document.querySelector(`.line-${Chance}`);
                elementToShow.classList.remove("hide"); 
                if (Chance == 11) {
                    const elementToShow = document.querySelector(".result");
                    const resText = document.querySelector(".resultText");
                    resText.textContent = ` Oops! you have lost :( the word is: ${wordToGuess}`;
                    elementToShow.classList.remove("hide"); 
                    buttons.classList.add("hide"); 
                }
            }
            e.target.setAttribute("disabled", "disabled"); 
        }
    }
);

const hangstandChildren = document.querySelector(".man").children;

for (let i = 0; i < hangstandChildren.length;i++){
    const child = hangstandChildren[i];
    child.classList.add("hide");
}
