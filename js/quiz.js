// Quiz Data
const quizData = [
    {
        question: "Before we met, my life was… 🤔",
        options: [
            "Peaceful",
            "Normal",
            "Incomplete",
            "Boring 😴"
        ],
        correct: 1
    },
    {
        question: "What happens to my heart when you look at me? 😳",
        options: [
            "Nothing",
            "It beats faster",
            "It forgets how to behave",
            "It says ‘She’s the one’"
        ],
        correct: 2
    },
    {
        question: "If you ignore me for 5 minutes, I… 😭",
        options: [
            "Stay calm",
            "Pretend I'm fine",
            "Miss you immediately",
            "Start overthinking life"
        ],
        correct: 1
    },
    {
        question: "What is my favorite notification? 📱",
        options: [
            "Instagram",
            "WhatsApp group",
            "Your message",
            "Bank credit alert 😄"
        ],
        correct: 2
    },
    {
        question: "If loving you was a job, my position would be… 💼❤️",
        options: [
            "Intern",
            "Manager",
            "CEO of Loving You",
            "Lifetime Employee"
        ],
        correct: 2
    },
    {
        question: "My safest place in the world is… 🫶",
        options: [
            "My room",
            "A quiet beach",
            "Your arms",
            "Anywhere with YOU"
        ],
        correct: 2
    },
    {
        question: "When I think about my future, I always see… ✨",
        options: [
            "Success",
            "Travel",
            "Happiness",
            "YOU standing beside me"
        ],
        correct: 2
    },
    {
        question: "If I had to describe YOU in one word… 💖",
        options: [
            "Cute",
            "Perfect",
            "Irreplaceable",
            "Mine 😌"
        ],
        correct: 3
    },
    {
        question: "If I could relive one moment with you forever, it would be… 🥹",
        options: [
            "Our first conversation",
            "The first time you smiled at me",
            "Every moment with you",
            "The moment I realized I love you"
        ],
        correct: 2
    },
    {
        question: "Final Question… The real reason I made this quiz is… 🎁",
        options: [
            "To test you",
            "To impress you",
            "To make you smile",
            "To remind you how much I love you"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

// Initialize Quiz
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('totalQuestions').textContent = quizData.length;
    renderQuestion();
});

function renderQuestion() {
    const wrapper = document.getElementById('quizWrapper');
    const data = quizData[currentQuestion];
    
    wrapper.innerHTML = `
        <div class="question-item active">
            <div class="question-text">${data.question}</div>
            <div class="options-list">
                ${data.options.map((option, index) => `
                    <button class="option-btn ${answers[currentQuestion] === index ? 'selected' : ''}" 
                            onclick="selectAnswer(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    updateProgress();
    updateButtons();
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
}

function selectAnswer(index) {
    answers[currentQuestion] = index;
    renderQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Show/hide previous button
    if (currentQuestion > 0) {
        prevBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none';
    }

    // Show/hide next and submit buttons
    if (currentQuestion === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

    // Disable next button if no answer selected
    nextBtn.disabled = answers[currentQuestion] === undefined;
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion();
        document.getElementById('quizWrapper').scrollTop = 0;
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        document.getElementById('quizWrapper').scrollTop = 0;
    }
}

function submitQuiz() {
    // Calculate score
    score = 0;
    answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });

    // Show result
    showResult(score);
}

function showResult() {
    const scorePercentage = (score / quizData.length) * 100;
    const resultModal = document.getElementById('resultModal');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultScore = document.getElementById('resultScore');

    // Determine result based on score
    let emoji, title, message;
    if (scorePercentage === 100) {
        emoji = '🌟';
        title = 'Perfect Score!';
        message = 'Wow! You know me so well! 💖';
    } else if (scorePercentage >= 80) {
        emoji = '😍';
        title = 'Excellent!';
        message = 'You really do know me! 💕';
    } else if (scorePercentage >= 60) {
        emoji = '😊';
        title = 'Good Job!';
        message = 'Nice effort! We should spend more time together! 💕';
    } else if (scorePercentage >= 40) {
        emoji = '🤔';
        title = 'Not Bad!';
        message = 'Okay, so you know a little about me! But let\'s get closer! 😊';
    } else {
        emoji = '😅';
        title = 'Oh No!';
        message = 'Looks like you need to know me better! But don\'t worry, that\'s what I\'m here for! ❤️';
    }

    resultEmoji.textContent = emoji;
    resultTitle.textContent = title;
    resultMessage.textContent = message;
    resultScore.textContent = `${score}/${quizData.length}`;

    resultModal.style.display = 'flex';
}

function goToOptions() {
    window.location.href = 'options.html';
}

function launchConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function () {
        if (Date.now() > animationEnd) {
            return clearInterval(interval);
        }

        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }, 100);
}