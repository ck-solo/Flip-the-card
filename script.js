let arr = ["😤","😂","😍","😎","😡","🤠","😴","🤢","🦉","🦤","👺","🦞","☠️","😶‍🌫️","😖","🥶","🤡","😈"];

let allarr = [...arr, ...arr ];


function randomArr() {
  for (let i = allarr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [allarr[i], allarr[j]] = [allarr[j], allarr[i]];
  }
  return allarr;
}
let scores = document.querySelector(".score b");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

let totalPairs = allarr.length / 2;
let matchedPairs = 0;

let container = document.querySelector("#container");
let rnArr = randomArr(allarr);


function createCards(){

container.querySelectorAll(".cards,.game-over").forEach(card => card.remove());

rnArr.forEach((val) => {
  let cards = document.createElement("div");
  cards.classList.add("cards");

  let flip = document.createElement("div");
  flip.classList.add("flip");

  let text = document.createElement("h1");
  text.classList.add("text");
  text.innerText = val;

  cards.append(flip, text);
  container.appendChild(cards);

  cards.addEventListener("click", () => {
    handleCard(cards);
  });
}); 
}

function handleCard(cards) {
 if (lockBoard || cards === firstCard) return;

    cards.classList.add("active");

    if (!firstCard) {
      firstCard = cards;
      return;
    }

    secondCard = cards;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
  let firstEmoji = firstCard.querySelector(".text").innerText;
  let secondEmoji = secondCard.querySelector(".text").innerText;

  if (firstEmoji === secondEmoji) {
    score++;
    scores.innerText = score;
    matchedPairs++;

    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert("Congratulations! You've matched all pairs!");
        location.reload();
      }, 500);
    }

    setTimeout(() => {
      firstCard.style.visibility = "hidden";
      secondCard.style.visibility = "hidden";
      resetGame();
    }, 400);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("active");
      secondCard.classList.remove("active");
      resetGame();
    }, 1000);
  }
}

function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function gameOver(){
  scores.style.display="none";

  let gameOverDiv=document.createElement("div");
  gameOverDiv.classList.add("game-over");
  gameOverDiv.innerHTML=`<h1>Game Over!</h1>
                          <button class="play-again">Play Again</button>`;

  container.appendChild(gameOverDiv);
   
  let playBtn = document.querySelector(".play-again");
  playBtn.addEventListener("click",()=>{
    restartGame();
  });

}

  function restartGame(){
    score=0;
    matchedPairs=0;

    scores.innerText=score;
    scores.style.display="block";

    resetGame();

    let gameOverDiv=document.querySelector(".game-over");
    gameOverDiv.remove();  
  }

  createCards();