const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Which programming language is known for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

const quizContainer = document.getElementById('quiz');
const scoreContainer = document.getElementById('score-container');
const leaderboardContainer = document.getElementById('leaderboard-container');

function loadQuiz() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.options.map((option, index) => 
                `<li><input type="radio" name="answer" value="${option}" id="option${index}">
                <label for="option${index}">${option}</label></li>`
            ).join('')}
        </ul>
    `;
    updateButtons();
}

function nextQuestion() {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
    } else {
        displayScore();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuiz();
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption && selectedOption.value === quizData[currentQuestionIndex].answer) {
        score++;
    }
}

function displayScore() {
    quizContainer.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
    saveToLeaderboard();
    displayLeaderboard();
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function saveToLeaderboard() {
    const playerName = prompt('Enter your name:');
    const playerData = { name: playerName, score };
    leaderboard.push(playerData);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 5)));
}

function displayLeaderboard() {
    let leaderboardHtml = `
        <h2>Leaderboard</h2>
        <div id="leaderboard">
            <table>
                <tr><th>Player</th><th>Score</th></tr>
    `;
    
    leaderboard.forEach(player => {
        leaderboardHtml += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
    });

    leaderboardHtml += '</table></div>';
    leaderboardContainer.innerHTML = leaderboardHtml;
}

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = false;
}

// Load the first question and the leaderboard
window.onload = function () {
    loadQuiz();
    displayLeaderboard();
};
