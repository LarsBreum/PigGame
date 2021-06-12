'use strict';
/*
Pig game. NEEDS these vars
let dice
let pl1Score
let pl2Score
let pl1Total
let pl2Total
const limit
function diceRoll
function addToScore(player)
function addToTotal(score, player)
*/
/*
Player objects, with properties:
score (int)
total (int)
turn (boolean)
*/

//progress: The game works. Needs to implement new game button, design changes when shifting turns
// and check when someone wins the game

const limit = 100;
let diceEyes = 0;
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

const pl1 = {
  name: 'Player 1',
  score: 0,
  total: 0,
  turn: true,
  scoreLabel: document.querySelector('#current--0'),
  totalLabel: document.querySelector('#score--0'),
  section: document.querySelector('.player--0'),
};
const pl2 = {
  name: 'Player 2',
  score: 0,
  total: 0,
  turn: false,
  scoreLabel: document.querySelector('#current--1'),
  totalLabel: document.querySelector('#score--1'),
  section: document.querySelector('.player--1'),
};

btnRoll.addEventListener('click', function () {
  diceRoll(pl1.turn ? pl1 : pl2);
});
btnHold.addEventListener('click', function () {
  addToTotal(pl1.turn ? pl1 : pl2);
  shiftTurns();
});
btnNewGame.addEventListener('click', newGame);

function diceRoll(player) {
  diceEyes = Math.floor(Math.random() * 6) + 1;
  dice.src = 'dice-' + diceEyes + '.png';
  if (diceEyes == 1) {
    player.score = 0;
    player.scoreLabel.textContent = 0;
    shiftTurns();
  } else {
    addToScore(player);
  }
}
function addToScore(player) {
  player.scoreLabel.textContent = player.score + diceEyes;
  //document.querySelector('#current--0').textContent = player.score + diceEyes;
  player.score += diceEyes;
}
function addToTotal(player) {
  player.total += player.score;
  player.totalLabel.textContent =
    Number(player.totalLabel.textContent) + player.score;
  player.score = 0;
  player.scoreLabel.textContent = player.score;
  if (player.total >= 100) {
    //player won
    alert(`${player.name} won!`);
    newGame();
  }
}

function shiftTurns() {
  if (pl1.turn) {
    pl1.turn = false;
    pl1.section.classList.remove('player--active');
    pl2.turn = true;
    pl2.section.classList.add('player--active');
  } else if (pl2.turn) {
    pl2.turn = false;
    pl2.section.classList.remove('player--active');
    pl1.turn = true;
    pl1.section.classList.add('player--active');
  }
}
function newGame() {
  pl1.turn = true;
  pl1.score = 0;
  pl1.total = 0;
  pl1.scoreLabel.textContent = 0;
  pl1.totalLabel.textContent = 0;
  pl2.turn = false;
  pl2.score = 0;
  pl2.total = 0;
  pl2.scoreLabel.textContent = 0;
  pl2.totalLabel.textContent = 0;
}
