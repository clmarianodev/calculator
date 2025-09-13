const display = document.getElementById("display");
const music = document.getElementById("music");

let num1 = null;
let operator = null;
let waitingForSecond = false;

const lyricsWithTiming = [
  ["Ang iyong", 3000],
  ["ganda'y", 2500],
  ["umaabot sa buwan", 5400],
  ["Ang tibok", 2900],
  ["ng puso'y", 2200],
  ["dinig sa kalawakan", 2900],
  ["At bumabalik", 1800],
  ["dito sa akin", 1800],
  ["Ikaw ang mahal", 1800],
  ["ikaw lang", 1000],
  ["ang mamahalin", 2000],
  ["Pakinggan", 1000],
  ["ang puso't", 800],
  ["damdamin", 1000],
  ["Damdamin aking damdamin", 2000],
];

function typeLyrics(index = 0) {
  if (index >= lyricsWithTiming.length) {
    display.value = "0";
    return;
  }

  const [word, delay] = lyricsWithTiming[index];
  let i = 0;
  display.value = "";

  const interval = setInterval(() => {
    display.value += word[i];
    i++;
    if (i >= word.length) {
      clearInterval(interval);
      setTimeout(() => typeLyrics(index + 1), delay);
    }
  }, 140);
}

document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const val = button.textContent;

    if (!isNaN(val) || val === ".") {
      if (waitingForSecond) {
        display.value = val;
        waitingForSecond = false;
      } else {
        display.value = display.value === "0" ? val : display.value + val;
      }
    } else if (val === "AC") {
      display.value = "0";
      num1 = null;
      operator = null;
    } else if (val === "+/-") {
      display.value = String(parseFloat(display.value) * -1);
    } else if (val === "%") {
      display.value = String(parseFloat(display.value) / 100);
    } else if (val === "√") {
      display.value = String(Math.sqrt(parseFloat(display.value)));
    } else if (val === "=") {
      if (operator && num1 !== null) {
        let num2 = parseFloat(display.value);
        let result;
        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "×":
            result = num1 * num2;
            break;
          case "÷":
            result = num2 !== 0 ? num1 / num2 : 0;
            break;
        }
        display.value = result;

        // Easter egg: 1 + 1
        if (num1 === 1 && num2 === 1 && operator === "+") {
          music.play();
          typeLyrics();
        }

        operator = null;
        num1 = null;
      }
    } else {
      // operator
      num1 = parseFloat(display.value);
      operator = val;
      waitingForSecond = true;
    }
  });
});
