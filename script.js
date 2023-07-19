'use strict';

//selecting the element values
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//-------------starting conditions
//Now we set the element value to 0
// score0Element.textContent = 0;
// score1Element.textContent = 0;

//We have hidden the dice class for now
// diceElement.classList.add('hidden');

//we need to create a current score variable outside the function block )

// let currentScore = 0;
// let activePlayer = 0;
// const scores = [0, 0];
// let playing = true;
let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

init();

//We are writing the swith the player as function and we are calling ,when ever we want

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle for swtitching the color when player is active
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

function winnerFunction() {
  alert(`🎊🎊🎲🎭 congrats to the winner 🎲🎭🎊🎊  `);
}

//Dice roll Functionality (onclick the rolldice  btn)

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceElement.classList.remove('hidden');
    //2.Display the Dice roll ,according to the random number generated
    diceElement.src = `dice-${dice}.png`;
    //3.check for the rollled dice ,1 or anyother.If it is 1 then switch to the next player
    if (dice !== 1) {
      //Add to the current score
      currentScore = currentScore + dice;

      //(It will change later ,when we considered the both players)
      // current0Element.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      //Switch to next player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // //toggle for swtitching the color when player is active
      // player0Element.classList.toggle('player--active');
      // player1Element.classList.toggle('player--active');

      switchPlayer();
    }
  }
});

//When the user clicks the hold button,the currect score should be add to active player score and switch to the other player
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //we are finishing the game here
      playing = false;
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winnerFunction();
      switchPlayer();

      //We have  to hidden the dice class  once the player wins the game
      diceElement.classList.add('hidden');
    } else {
      //switch to  the next player
      switchPlayer();
    }
  }
});
// btnNew.addEventListener('click', function () {
//   //   score0Element.textContent = 0;
//   //   score1Element.textContent = 0;
//   //   current0Element.textContent = 0;
//   //   current1Element.textContent = 0;
//   //   player0Element.classList.remove('player--winner');
//   //   player1Element.classList.remove('player--winner');
//   //   player0Element.classList.add('player--active');
//   //   player1Element.classList.remove('player--active');
// });
btnNew.addEventListener('click', init);
