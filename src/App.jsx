/* eslint-disable import/no-anonymous-default-export */
import "./App.css";
import { useForm } from "react-hook-form";

var randomNum = Math.floor(Math.random() * 100) + 1;
console.log(`random num ${randomNum}`);

let guessCount = 1;

let guesses = [];

function checkGuess(value) {
  guesses.push(value);
  document.getElementById("showGuesses").innerHTML = `prevoius guess: ${guesses}`;
  if (randomNum == value) {
    //alert("right");
  } else {
    //alert("wrong");
  }
}

export default () => {
  const { register, getValues } = useForm();
  return (
    <div className="App">
      <header className="App-header" >
        <p>Random-number-guess-game</p>
        <form>
          <input {...register("test")} />
          <button
            type="button"
            onClick={() => {
              const value = getValues("test");
              checkGuess(value);
            }}
          >
            Submit
          </button>
        </form>

        <div className="resultParas">
          <p id="showGuesses"></p>
          <p className="showLastResult"></p>
          <p className="showLowOrHi"></p>
        </div>

      </header>
    </div>
  );
};
