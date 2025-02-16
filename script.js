let currWord, wrongCount = 0, correctLetters = [];
const maxGuesses = 6;

const wordDisplay = document.querySelector(".word-display");
const keyboards = document.querySelector(".keyboard");
const gusses = document.querySelector(".gusses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const gameModelContent = document.querySelector(".game-model .content");
const playagain = document.querySelector(".play-again");

const resetGame = () => {
    correctLetters = [];
    wrongCount = 0;
    hangmanImage.src = `./hangman-${wrongCount}.svg`;
    gusses.innerText = `${wrongCount} / ${maxGuesses}`;
    keyboards.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

const randomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const GameOver = (isWin) => {
    setTimeout(() => {
        const modelText = isWin ? `You Found the word` : 'The correct word was:';
        gameModel.querySelector("img").src = `./${isWin ? `victory.gif` : `lost.gif`}`
        gameModel.querySelector("h4").innerText = `${isWin ? `Congrats!` : `Game Over`}`
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currWord}</b>`
        gameModel.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currWord.includes(clickedLetter)) {
        [...currWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongCount++;
        hangmanImage.src = `./hangman-${wrongCount}.svg`;
    }
    button.disabled = true;
    gusses.innerText = `${wrongCount} / ${maxGuesses}`;
    if (wrongCount === maxGuesses) return GameOver(false);
    if (correctLetters.length === currWord.length) return GameOver(true);
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboards.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

randomWord();
playagain.addEventListener("click", randomWord);
