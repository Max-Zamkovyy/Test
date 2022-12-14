const data = [
  {
    id: 1,
    question: "Шарік, ти балбес?",
    answers: [
      { answer: "Так, повний", isCorrect: true },
      { answer: "Так, трохи", isCorrect: false },
      { answer: "Сам ти балбес", isCorrect: false },
      { answer: "Скажи про це мені ти :)", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Балбес ти чи ні, Шарик?",
    answers: [
      { answer: "Ні", isCorrect: false },
      { answer: "Сам балбес", isCorrect: false },
      { answer: "Так, повний", isCorrect: true },
      { answer: "Відвали", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "А може все таки балбес?",
    answers: [
      { answer: "Ні", isCorrect: false },
      { answer: "Так, повний", isCorrect: true },
      { answer: "Пішов на йух!", isCorrect: false },
    ],
  },
];

// 1. Написати функцію, яка показуватиме відповіді та поточне питання.
//  В рамках цієї функції зробити перевірку на останнє питання і якщо перевірка проходить, то показувати результат.

//   Приклад розмітки однієї відповіді:
//   <div class="answer">
//     <input type="radio" id=${index} name="answer" value=${isCorrect} />
//     <label for=${index}>{answer}</label>
//   </div>
// 2. Написати функцію, яка вішатиме обробники подій click на всі відповіді. І записувати значення в змінну selectedAnswer
let questionIndex = 0;
let selectedAnswer = null;
let correctCount = 0;
let wrongCount = 0;

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const submitButton = document.querySelector(".submit");
const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const correctAnswer = resultScreen.querySelector(".correct");
const wrongtAnswer = resultScreen.querySelector(".wrong");
const scoreResult = resultScreen.querySelector(".score");
const playAgainButton = document.querySelector(".play");
const conclusion = resultScreen.querySelector(".conclusion");



const selectAnswer = () =>{
    answers.querySelectorAll("input").forEach(element =>{
        element.addEventListener("click", (event) => {
            selectedAnswer = event.target.value;
        })
    })
}

function showQuestion(index) {
    if (index === data.length) {
        showResult();
    } else {
        question.textContent = data[index].question;

    const answersQ = data[index].answers.map((item, index) => `
     <div class="answers">
        <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
        <label for=${index}>${item.answer}</label>
    </div>`).join("");
    answers.innerHTML = answersQ;
    selectAnswer();
    }
}


// 3. Написати функцію onSubmit, яка вішатиме обробник подій на кнопку Submit.
// Перевірити чи вибрана відповідь. Якщо вибрано, тоді зробити перевірку на правильну відповідь, інкрементувати correctCount або wrongCount.
// І також інкрементувати індекс наступного питання

const onButton = () =>{
    submitButton.addEventListener("click", () => {
if(selectedAnswer !== null) {
    selectedAnswer === "true" ? correctCount++ : wrongCount++;
    questionIndex++;
    showQuestion(questionIndex);
} else {
    alert("Обери вдповідь!");
}
    })
}

const showResult = () => {
    gameScreen.style.display = "none";
    resultScreen.style.display = "block";

    correctAnswer.textContent = `Correct answers ${correctCount}`;
    wrongtAnswer.textContent = `Wrong answers ${wrongCount}`;
    scoreResult.textContent = `Score: ${correctCount - wrongCount}`;
    let scoreNum = Number(correctCount - wrongCount);

    if(scoreNum===data.length){
        conclusion.textContent = `Поздоровляю, Шарік, ти балбес!!!`;
    } else if (scoreNum>=0 && scoreNum< data.length){
        conclusion.textContent = `Шарік, ти трохи балбес`;
    } else {
        conclusion.textContent = `Ти взагалі читав питання?`;
    }
}


// 4. Написати функцію showResult, яка показуватиме блок із результатом та записуватиме значення
// По прикладу
  // `Correct Answers: ${correctCount}`;
  // `Wrong Answers: ${wrongCount}`;
  // `Score: ${(correctCount - wrongCount) * 10}`;


// 5. Написати функцію resetResult, яка скидатиме наступні значення
// questionIndex, correctCount, wrongCount

const resetResult = () => {
    questionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
}
/* 6. Повісити обробник подій на кнопку Play again, яка має показувати блок із питаннями, приховати блок із результом,
 скинути всі значення в 0, а також показувати перше питання.*/

playAgainButton.addEventListener("click", () => {
    gameScreen.style.display = "block";
    resultScreen.style.display = "none";
    resetResult();
    showQuestion(questionIndex);
 });

onButton();
showQuestion(questionIndex);
