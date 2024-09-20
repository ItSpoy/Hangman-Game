const hangmanimage = document.querySelector(".hangman-box img");
const worddisplay = document.querySelector(".word-display");
const guessestext = document.querySelector(".guesses-text b");
const keyboarddiv = document.querySelector(".keyboard");
const gamemodal = document.querySelector(".game-modal");
const playagainbtn = document.querySelector(".play-again")

let currentword , correctletters  ,wrongguesscount  ;
const maxguesses = 6;

const resetgame  = () => {
    correctletters = [];
    wrongguesscount = 0;
    hangmanimage.src = `images/hangman-${wrongguesscount}.svg`;
    guessestext.innerText = `${wrongguesscount} / ${maxguesses}`;
    keyboarddiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    worddisplay.innerHTML = currentword.split("").map(()=> `<li class ="letter"></li>`).join("");
    gamemodal.classList.remove("show");
}

const getrandomword = () =>{
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentword = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint ;
    resetgame();
}

const gameover =(isvictory) => {
    setTimeout(()=> {
        const modaltext = isvictory ? `You found the Word :` : `The Correct word was :`;
        gamemodal.querySelector("img").src = `images/${isvictory ? 'victory' : 'lost'}.gif`;
        gamemodal.querySelector("h4").innerText = `${isvictory ? 'Congrats !' : 'Game Over !'}`;
        gamemodal.querySelector("p").innerHTML = `${modaltext} <b>${currentword}</b>`;
        gamemodal.classList.add("show");
    },300);
}

const initgame = (button , clickedletter) => {
    if(currentword.includes(clickedletter)){
        [...currentword].forEach((letter, index) => {
            if(letter === clickedletter){
                correctletters.push(letter);
                worddisplay.querySelectorAll("li")[index].innerText = letter ;
                worddisplay.querySelectorAll("li")[index].classList.add("guessed"); 
            }
        });
    } else {
        wrongguesscount++;
        hangmanimage.src = `images/hangman-${wrongguesscount}.svg`;
    }
    button.disabled = true;
    guessestext.innerText = `${wrongguesscount} / ${maxguesses}`;
    // Calling Game Over function 
    if(wrongguesscount === maxguesses) return gameover(false);
    if(correctletters.length === currentword.length) return gameover(true);
}


// tasna3 l9rousa mt3 keyboard
for (let i = 97 ; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click" ,e => initgame(e.target, String.fromCharCode(i)));

}

getrandomword();
playagainbtn.addEventListener("click" , getrandomword);