const question = document.querySelector('#question');
const quizImg = document.getElementById('quizImg');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const img1 = document.getElementById('quizImg1');
const img2 = document.getElementById('quizImg2');
const img3 = document.getElementById('quizImg3');
const img4 = document.getElementById('quizImg4');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the name of this art piece?',
        imgSrc: 'images/impression.jpg',
        choice1: "San Giorgio Maggiore at Dusk by Claud Monet",
        image1: '',
        choice2: 'Impression, Sunrise by Claude Monet',
        image2: '',
        choice3: 'The Houses of Parliment, Sunset by Claude Monet',
        image3: '',
        choice4: 'Reflections of Clouds on the Water-Lily Pond by Claude Monet',
        image4: '',
        answer: 2
    },
    {
        question: 'Which one of these was made by Vincent Van Gogh?',
        imgSrc: '',
        choice1: '',
        image1: 'images/star.jpg',
        choice2: '',
        image2: 'images/whitestar.jpg',
        choice3: '',
        image3: 'images/starry.jpg',
        choice4: '',
        image4: 'images/fakestar.jpg',
        answer: 1
    },
    {
        question: 'Who made this painting?',
        imgSrc: 'images/thompson.jpg',
        choice1: 'Donna Young',
        image1: '',
        choice2: 'Caroline Zimmermann',
        image2: '',
        choice3: 'Amy Everhart',
        image3: '',
        choice4: 'Elizabeth Thompson',
        image4: '',
        answer: 4
    },
    {
        question: 'Who made this painting?',
        imgSrc: 'images/scream.jpg',
        choice1: 'Salvador Dali',
        image1: '',
        choice2: 'Vincent Van Gogh',
        image2: '',
        choice3: 'Edvard Munch',
        image3: '',
        choice4: 'Eugene Delacroix',
        image4: '',
        answer: 3
    },
    {
        question: 'Which painting was made by Katsushika Hokusai?',
        imgSrc: '',
        choice1: '',
        image1: 'images/whitestar.jpg',
        choice2: '',
        image2: 'images/great.jpg',
        choice3: '',
        image3: 'images/spring.jpg',
        choice4: '',
        image4: 'images/birdplum.jpg',
        answer: 2
    },
    {
        question: 'When was Andy Warhol born?',
        imgSrc: '',
        choice1: '1928',
        image1: '',
        choice2: '1912',
        image2: '',
        choice3: '1898',
        image3: '',
        choice4: '1920',
        image4: '',
        answer: 1
    },
    {
        question: 'Who directed the movie shown in the picture?',
        imgSrc: 'images/lotr.jpg',
        choice1: 'Steven Speilberg',
        image1: '',
        choice2: 'Peter Jackson',
        image2: '',
        choice3: 'Woody Allen',
        image3: '',
        choice4: 'Robert Altman',
        image4: '',
        answer: 3
    },
    {
        question: 'Which painting made by Leonardo Da Vinci is permanently displayed in the Louvvre Museum?',
        imgSrc: '',
        choice1: 'Salvator Mundi',
        image1: '',
        choice2: 'The Lady with an Ermine',
        image2: '',
        choice3: 'The Last Supper',
        image3: '',
        choice4: 'Mona Lisa',
        image4: '',
        answer: 4
    },
    {
        question: 'Which of these paintings by Johannes Vermeer is currently missing?',
        imgSrc: '',
        choice1: 'The Astronomer',
        image1: 'images/astronomer.jpg',
        choice2: 'The Concert',
        image2: 'images/concert.jpg',
        choice3: 'The Art of Painting',
        image3: 'images/painting.jpg',
        choice4: 'The Milkmaid',
        image4: 'images/milk.jpg',
        answer: 2
    },
    {
        question: 'The largest art theft in the world took place in what year?',
        imgSrc: '',
        choice1: '1990',
        image1: '',
        choice2: '1940',
        image2: '',
        choice3: '2010',
        image3: '',
        choice4: '1999',
        image4: '',
        answer: 1
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

    quizImg.innerHTML = '<img src=' + currentQuestion.imgSrc + '>'

    img1.innerHTML = '<img src=' + currentQuestion.image1 + '>'
    img2.innerHTML = '<img src=' + currentQuestion.image2 + '>'
    img3.innerHTML = '<img src=' + currentQuestion.image3 + '>'
    img4.innerHTML = '<img src=' + currentQuestion.image4 + '>'

    

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