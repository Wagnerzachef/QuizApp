const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("newHighScores")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")