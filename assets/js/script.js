/* ALL answer options*/
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

// ALL our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('questions'),
    numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestion = document.getElementById('number-of-all-question');


let indexOfQuestion, //иднекс текущего впороса
    indexOfPage = 0; //индекс страниц

const btnNext = document.getElementById('btn-next');

let score = 0;  // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQustionsTwo = document.getElementById('number-of-all-qustions-2'),
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Сколько градусов наулице',
        options: [
            '29 градусов',
            '15 градусов',
            '11 градусов',
            '0 градусов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что надеть на верх',
        options: [
            'Пальто',
            'Тренч',
            'Худи',
            'Футболку',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что надеть на низ',
        options: [
            'Шорты',
            'Брюки',
            'Джинсы',
            'Треники',
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestion.innerHTML = questions.length; // количество всех вопрос

const load = function() {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей станицы
    indexOfPage++; // увелечение индекса страницы;
};

let completedAnswers = [];

const randomQustion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQustion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        };
        if(completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQustionsTwo.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Выберите хоть что-то');
    } else {
        randomQustion();
        enableOptions();
    }
}

btnNext.addEventListener('click', validate);

window.addEventListener('load', () => {
    randomQustion();
})



