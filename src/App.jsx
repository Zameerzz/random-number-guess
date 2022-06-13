import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";

var randomNum = Math.floor(Math.random() * 100) + 1;
console.log(`random num ${randomNum}`);

let guessCount = 1;

let myItems = [];
function checkGuess(value) {
  console.log(`show the random number ${randomNum}`);
 
  if (randomNum == value) {
    alert("right");
  } else {
     alert("wrong");
  }
  console.log(`show the random nu ${randomNum}`);
  guessCount++;
  value = "";
}

export default () => {
  const { register, handleSubmit, getValues } = useForm();

  return (
    <div className="App">
      <header className="App-header">
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
          <p className="showGuesses">
          </p>
          <p className="showLastResult"></p>
          <p className="showLowOrHi"></p>
        </div>
      </header>
    </div>
  );
};
