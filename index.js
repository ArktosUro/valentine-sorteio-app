let namesList = [];

const slot = document.getElementById("slot");
const result = document.getElementById("result");

let spinning = false;

document.getElementById("input-name").focus();

function showInput() {
  const inputName = document.getElementById("input-name");
  const inputNumber = document.getElementById("input-number");

  namesList.push({
    name: inputName.value,
    number: inputNumber.value,
  });

  document.getElementById("result").textContent = namesList
    .map((person) => `${person.name} (${person.number})`)
    .join(", ");

  inputName.value = "";
  inputNumber.value = "";

  inputName.focus();
}

function spinReel() {
  if (namesList.length === 0 || spinning) return;

  spinning = true;
  result.textContent = "";

  let index = 0;
  let speed = 60; // start fast

  const interval = setInterval(() => {
    const person = namesList[index % namesList.length];

    slot.textContent = `${person.name} (${person.number})`;

    index++;
  }, speed);

  // stop after a short time with slowdown feel
  setTimeout(() => {
    clearInterval(interval);

    // pick REAL winner from list
    const winner = namesList[Math.floor(Math.random() * namesList.length)];

    slot.textContent = `${winner.name} (${winner.number})`;
    result.textContent = `💖 Winner: ${winner.name}`;

    spinning = false;
  }, 2000);
}

document.getElementById("my-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload
  showInput();
});
