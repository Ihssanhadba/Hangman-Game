let wordToGuess;
fetchData();
hideHang();
function fetchData() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            getRandomObj(data);
            initData();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

let word = document.getElementsByTagName("p");
const buttons = document.querySelectorAll(".btn");
let Chance = 0, score = 0;
let correct;
Array.from(buttons).forEach(button => {
    button.addEventListener("click", (e) => {
        correct = false;
        const letterClicked = e.target.textContent;
        //  let word = document.getElementsByTagName("p");
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if (letter.textContent == letterClicked.toLowerCase()) {
                correctAnswer(e, i)
            }
            else if (score == word.length) {
                Winner();
            }

        }
        if (!correct) {
            wrongAnswer(e, Chance++);
            if (Chance == 11) {
                loser();
            }
        }
        e.target.setAttribute("disabled", "disabled");
    }
    );
})

function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

function getRandomObj(data) {
    const words = data.words;
    const randomIndex = getRandomInt(words.length - 1);
    return randomWordObject = words[randomIndex];
}

function initData() {
    const category = document.getElementById('category');
    category.textContent = randomWordObject.category;
    const gameDiv = document.getElementById('word');
    wordToGuess = randomWordObject.word;
    Array.from(wordToGuess).forEach(element => {
        let wordElement = document.createElement('p');
        wordElement.textContent = element;
        gameDiv.appendChild(wordElement);
    });
}

function correctAnswer(e, i) {
    word[i].style.color = "black";
    score++;
    correct = true;
    e.target.style.background = "green";
};

function Winner() {
    const elementToShow = document.querySelector(".result");
    const resText = document.querySelector(".resultText");
    resText.textContent = ` Congrats!! but you have made ${Chance} mistakes :`;
    elementToShow.classList.remove("hide");
    Array.from(buttons).forEach(button => {
        button.classList.add("hide");
    });
}

function wrongAnswer(e, Chance) {
    Chance++;
    e.target.style.background = "red";
    const elementToShow = document.querySelector(`.line-${Chance}`);
    elementToShow.classList.remove("hide");
}

function loser() {
    const elementToShow = document.querySelector(".result");
    const resText = document.querySelector(".resultText");
    resText.textContent = ` Oops! you have lost :( the word is: ${wordToGuess}`;
    elementToShow.classList.remove("hide");
    Array.from(buttons).forEach(button => {
        button.classList.add("hide");
    });
}

function retryGame() {
    Chance = 0, score = 0;
    fetchData();
    hideHang();
    Array.from(word).forEach(element => {
        element.parentNode.removeChild(element);;

    });
    Array.from(buttons).forEach(button => {
        button.classList.remove("hide");
        button.style.background = "blue";
        button.removeAttribute('disabled');
    });
    elementToShow.classList.add("hide");
}
function hideHang() {
    const hangstandChildren = document.querySelector(".man").children;
    Array.from(hangstandChildren).forEach(element => {
        element.classList.add("hide");
    });
}

