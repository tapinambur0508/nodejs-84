const generateNumber = require("./generateNumber");

function lottery(expect) {
  const actual = generateNumber();

  console.log({ actual });

  if (actual !== expect) {
    return "You lost:(";
  }

  return "$$$ You WIN! $$$";
}

module.exports = lottery;
