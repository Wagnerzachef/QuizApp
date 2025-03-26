const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'In the last year more than 250 billion PDFs were opened using products from what highly successful creative software company?',
        choice1: 'Microsoft',
        choice2: 'Adobe',
        choice3: 'Function',
        choice4: 'IBM',
        answer: 2,
    },
    {
        question: 'The first Android-powered device from Samsung Mobile also became the first in a long-running product line for the company. What was the name of this device?',
        choice1: 'Universe',
        choice2: 'Star',
        choice3: 'Planet',
        choice4: 'Galaxy',
        answer: 4,
    },
    {
        question: 'Now appearing prophetic, what device was announced in 2007 with the following slogan? "This is only the beginning."',
        choice1: 'iPhone',
        choice2: 'PlayStation 3',
        choice3: 'Netflix',
        choice4: 'Asimo',
        answer: 1,
    },
    {
        question: 'Kevin Mitnick, Adrian Lamo, Albert Gonzalez, Anonymous, and Jeanson James Ancheta are all (in)famous in what specific area of computers?',
        choice1: 'Networking',
        choice2: 'Security',
        choice3: 'Programming',
        choice4: 'Storage',
        answer: 2,
    },
    {
        question: 'What term is used for the most basic level or core of an operating system, responsible for resource allocation, file management and security?',
        choice1: 'Unix',
        choice2: 'Xenix',
        choice3: 'Kernal',
        choice4: 'Ventura',
        answer: 3,
    },
    {
        question: 'The H-Store system is considered one of the most prominent examples in the class of parallel database management systems which are typically known by what six-letter name?',
        choice1: 'NewSQL',
        choice2: 'SQLite',
        choice3: 'NotSQL',
        choice4: 'MySQLs',
        answer: 1,
    },
    {
        question: '“Big iron” is a nickname for which type of computer that is mostly used to quickly process a lot of data?',
        choice1: 'Server',
        choice2: 'Supercomputer',
        choice3: 'Laptop',
        choice4: 'Mainframe',
        answer: 4,
    },
    {
        question: 'APKs are downloadable files that store applications for which operating system?',
        choice1: 'Microsoft',
        choice2: 'Unix',
        choice3: 'Android',
        choice4: 'iOS',
        answer: 3,
    },
    {
        question: 'In what year did Apple standardize their chargers with the introduction of the Lightening cable?',
        choice1: '2011',
        choice2: '2012',
        choice3: '2013',
        choice4: '2014',
        answer: 2,
    },
    {
        question: 'What three-letter acronym is used for the industry standard, first released in 1996, used to connect computers with peripheral devices?',
        choice1: 'USB',
        choice2: 'DVD',
        choice3: 'SSD',
        choice4: 'UPS',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()