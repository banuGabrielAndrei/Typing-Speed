const SECONDS_PER_MINUTE = 60;
const CRITICAL_TIME = 10;

let gameTexts = [
    "Quantum computing is a fascinating field at the intersection of physics and computer science, where bits can be in multiple states at once, opening new possibilities in computation.",
    "Artificial intelligence, or AI, is revolutionizing industries by simulating human intelligence to perform tasks like natural language processing and image recognition.",
    "Blockchain technology is changing the way we think about trust and security, enabling decentralized systems that have the potential to disrupt traditional industries.",
    "The Internet of Things (IoT) connects everyday devices to the internet, creating a network of smart, data-generating objects that enhance our lives.",
    "Machine learning algorithms analyze vast datasets to make predictions and decisions, driving applications from recommendation systems to autonomous vehicles."
];
let gameText = document.getElementById("gamesText");
let result = document.getElementById("result");
let index = 0;
let time = SECONDS_PER_MINUTE;
let timeInterval;
let textArray;
let spans;
let gameTextSpans;
let inputText;
let inputWords;
let numberOfCorrectWords = 0;

function startGame() {
    selectTextGame();
    timeInterval = setInterval(decreaseTime, 1000);
    document.getElementById("startButton").disabled = true;
    document.getElementById("inputText").disabled = false;
}

function selectTextGame() {
    index = Math.floor(Math.random() * gameTexts.length);
    textArray = gameTexts[index].split(" ");
    spans = textArray.map(word => `<span>${word}</span>`);
    gameText.innerHTML = spans.join(" ");
}

function decreaseTime() {
    document.getElementById("gameTime").innerText = "TIME: " + time + "s";
    if (time == CRITICAL_TIME) {
        document.getElementById("gameTime").style.color = "red";
    }
    if (time == 0) {
        endGame();
    }
    --time;
}

function checkCharacters() {
    gameTextSpans = gameText.querySelectorAll("span");
    inputText = document.getElementById("inputText").value;
    inputWords = inputText.split(" ");
    for (let i = 0; i < gameTextSpans.length; i++) {
        gameTextSpans[i].style.color = "blue";
        if (i < inputWords.length) {
            if (inputWords[i] == gameTextSpans[i].textContent) {
                gameTextSpans[i].style.color = "green";
            } else {
                gameTextSpans[i].style.color = "red";
            }
        }
    }
}

function endGame() {
    clearInterval(timeInterval);
    checkCorrectWords();
    result.style.display = "block";
    document.getElementById("resetButton").disabled = false;
    document.getElementById("inputText").disabled = true;
}

function checkCorrectWords() {
    for (let i = 0; i < gameTextSpans.length; i++) {
        if (gameTextSpans[i].style.color == "green") {
            ++numberOfCorrectWords;
        }
    }
    result.innerText = "You have written, " + numberOfCorrectWords + " out of " + textArray.length + " words, correctly";
}

function resetGame() {
   location.reload();
}