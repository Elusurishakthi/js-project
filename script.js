const quizData = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    answers: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: "<script>"
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Google", "Microsoft", "Netscape", "Apple"],
    correct: "Netscape"
  }
];

// 🔹 Shuffle function (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle questions once
shuffle(quizData);

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  nextBtn.style.display = "none";
  answersEl.innerHTML = "";

  const q = quizData[currentQuestion];
  progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  questionEl.textContent = q.question;

  // Copy + shuffle answers
  const shuffledAnswers = [...q.answers];
  shuffle(shuffledAnswers);

  shuffledAnswers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(btn, answer, q.correct));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(button, selected, correct) {
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons.forEach(btn => {
      if (btn.textContent === correct) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>`;
  progressEl.textContent = "";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
}

loadQuestion();
