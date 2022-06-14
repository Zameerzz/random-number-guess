/* eslint-disable import/no-anonymous-default-export */
import "./App.css";
import { useForm } from "react-hook-form";

var randomNum = Math.floor(Math.random() * 100) + 1; // here generating the random number.
console.log(randomNum);

let guessCount = 1; // To know the user's turns we need to initialize with 1;
let guesses = []; // this is the variable that we use to store our guesses and empty the guesses in arr while reseting the game.
let resetBtn;

let happyFace = "&#128512"; // happy face emoji
let sadFace = "&#128543"; //sad face emoji

function checkGuess(value) {
  // checkGuess  function is used to check the entered number with generated random number.
  guesses.push(value); // here we are pushing the guesses values in the empty array to show the previous guesses.

  document.getElementById(
    // here we are showing the stored guesses array values
    "showGuesses"
  ).innerHTML = `prevoius guess:   ${guesses}`;

  if (randomNum == value) {
    document.getElementById(
      "showLastResult"
    ).innerHTML = `Congratulations! You got it right ${happyFace}`; // displaying the text if  correctly guessed

    document.getElementById("showLowOrHi").innerHTML = ""; // not showing the hi or low if correctly guessed

    document.getElementById("showLastResult").style.backgroundColor = "green"; /// changing the baground color if  correctly guessed

    gameOver(); //gameover function
  } else if (guessCount === 10) {  // if 10 turns over show the set game over texts 
    document.getElementById(
      "showLastResult"
    ).innerHTML = `Sorry Game Over ${sadFace}`; // displaying the text if  not correctly guessed in 10 turns
    document.getElementById("showLowOrHi").innerHTML = ""; // displaying nothig

    gameOver();
  } else {
    document.getElementById("showLastResult").innerHTML = "Wrong"; // displaying the text if  not correctly guessed

    document.getElementById("showLastResult").style.backgroundColor = "red"; /// changing the baground color if  not correctly guessed

    if (value < randomNum) {
      document.getElementById("showLowOrHi").innerHTML =
        "Last guess was too low!"; // displaying the text guessed value is low
    } else if (value > randomNum) {
      document.getElementById("showLowOrHi").innerHTML =
        "Last guess was too high!"; // displaying the text guessed value is high
    }
  }

  guessCount++; // this is the increment of the guesses count;
}

function gameOver() {
  document.getElementById("guessField").disabled = true; // not allowing to enter any extra input by disabling true

  document.getElementById("btn").disabled = true; // not allowing to click any submits input by disabling true

  resetBtn = document.createElement("button"); // creating element

  resetBtn.innerHTML = "start new game"; // text buttton text

  document.getElementById("resultParaTags").appendChild(resetBtn); // adding start new game to the resultParaTags and eventlistner
  resetBtn.addEventListener("click", resetGame);
}

function resetGame() {
  // reseting the game for play again
  guessCount = 1;

  const resetParas = document.querySelectorAll("#resultParaTags p"); // clearing the texts of  all 3 tags
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  guesses = []; // clearing previous guesses

  document.getElementById("guessField").disabled = false; // allowing to enter inputs in input field

  document.getElementById("btn").disabled = false; // allowing to submit entries.

  document.getElementById("guessField").value = ""; // clearing previous entry from input field

  randomNum = Math.floor(Math.random() * 100) + 1; // generating the random number again for after winning or game over

  resetBtn.parentNode.removeChild(resetBtn); // removing the resetButton
}

export default () => {
  const { register,getValues} = useForm();
  
  return (
    <div className="App">
      <header className="App-header">
        <h3>Random-number-guess-game</h3>

        <span>Please do not refresh or press Enter key</span>

        <form >
          <input type = "number" {...register("inputGuess", { min:1, max:100})} id="guessField" />
 
          <button
            type="button"
            onClick={() => {
              const value = getValues("inputGuess");
              checkGuess(value);
            }}
            id="btn"
          >
            Submit
          </button>

        </form>

        <div id="resultParaTags" className="divP">
          <p id="showGuesses"></p>
          <p id="showLastResult"></p>
          <p id="showLowOrHi"></p>
        </div>
      </header>
    </div>
  );
};
