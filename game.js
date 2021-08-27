const question = document.getElementsByClassName("question")[0];
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let c = 0;
let questions = [];
let activate = false;
let category = localStorage.getItem('selectedChoice');
fetch(`questions_${category}.json`)
    .then(res => res.json())
    .then(loadedQuestions => {
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        if (err == 'SyntaxError: Unexpected token < in JSON at position 0') window.location.href = 'index.html';
        else console.error;
    })

// fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
//     .then(res => res.json())
//     .then(loadedQuestions => {
//         console.log(loadedQuestions.results);
//         questions = loadedQuestions.results.map(loadedQuestion => {
//             const formattedQuestion = {
//                 question: loadedQuestion.question
//             };

//             const answerChoices = [...loadedQuestion.incorrect_answers];
//             const indexCorrect = Math.floor(Math.random() * 3) + 1;
//             formattedQuestion.answer = indexCorrect;
//             answerChoices.splice(indexCorrect - 1, 0, loadedQuestion.correct_answer);

//             answerChoices.forEach((choice, index) => {
//                 formattedQuestion["choice" + (index + 1)] = choice;
//             });

//             return formattedQuestion;
//         })
//         startGame();
//     })
//     .catch(err => console.error(err))


const CORRECT_POINT = 10;
const NUM_QUESTIONS = 6;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    if (availableQuestions.length > 0) {
        getNewQuestion();
        game.classList.remove('hidden');
        loader.classList.add('hidden');
    }

}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= NUM_QUESTIONS) {
        const selectedChoice = localStorage.getItem('selectedChoice');
        localStorage.setItem(`lastScore${selectedChoice}`, score);
        window.location.href = "./end.html";
        return;
    }

    questionCounter++;
    if (questionCounter == NUM_QUESTIONS) {
        document.getElementById('next-btn').innerHTML = "Finish";
    }
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    document.getElementById('next-btn').disabled = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log("Answer: " + currentQuestion.answer);
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);
        choices[currentQuestion.answer - 1].parentElement.classList.add('correct');
        document.getElementById('next-btn').disabled = false;
        if (selectedAnswer == currentQuestion.answer) gainScore();
        loadNextQuestion();
    })
})

gainScore = () => {
    score += 10;
    document.getElementById('current-score').innerHTML = score;
}

clearLastCheck = () => {
    choices.forEach(choice => {
        choice.parentElement.classList.remove('correct');
        choice.parentElement.classList.remove('incorrect');
    })
}

loadNextQuestion = () => {
    document.getElementById('next-btn').onclick = () => {
        clearLastCheck();
        getNewQuestion();
    }
}


startGame();