const questions = [
     {
          question: 'Jakou hůlku měl Albus Brumbál?',
          answers: [
               {text: 'Bezovou', correct: true},
               {text: 'Neznámou', correct: false},
               {text: 'Habrovou', correct: false},
               {text: 'Cesmínovou', correct: false},
          ]
     },
     {
          question: 'Která z uvedených NENÍ relikvie smrti?',
          answers: [
               {text: 'Neviditelný plášť', correct: false},
               {text: 'Bezedný kotlík', correct: true},
               {text: 'Kámen vskříšení', correct: false},
               {text: 'Bezová hůlka', correct: false},
          ]
     },
     {
          question: 'Kdo byl nejstarší??',
          answers: [
               {text: 'Harry Potter', correct: false},
               {text: 'Draco Malfoy', correct: false},
               {text: 'Ron Weasley', correct: false},
               {text: 'Hermiona Grangerová', correct: true},
          ]
     },
     {
          question: 'Od koho dostal Rubeus Hagrid létající motorku?',
          answers: [
               {text: 'Od Siriuse Blacka', correct: true},
               {text: 'Od Albuse Brumbála', correct: false},
               {text: 'Od Jamese Pottera', correct: false},
               {text: 'Od Arthura Weasleho', correct: false},
          ]
     },
     {
          question: 'Jaké je číslo trezoru Harryho Pottera?',
          answers: [
               {text: '713', correct: false},
               {text: '711', correct: false},
               {text: '687', correct: true},
               {text: '998', correct: false},
          ]
     },
     {
          question: 'Jak se jmenovala Lenka celým jménem?',
          answers: [
               {text: 'Lenka Střelenka', correct: false},
               {text: 'Lenka Láskorádová', correct: true},
               {text: 'Lenka Laskavá', correct: false},
               {text: 'Lenka Lákavá', correct: false},
          ]
     },
     {
          question: 'Jak se jmenoval třihlavý pes, který hlídal vchod ke kameni mudrců?',
          answers: [
               {text: 'Tesák', correct: false},
               {text: 'Dráp', correct: false},
               {text: 'Norbert', correct: false},
               {text: 'Chloupek', correct: true},
          ]
     }
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-button')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
     currentQuestionIndex = 0
     score = 0
     nextButton.innerHTML = 'Next'
     showQuestion()
}

function showQuestion(){
     resetState()
     let currentQuestion = questions[currentQuestionIndex]
     let questionNo = currentQuestionIndex + 1
     questionElement.innerHTML = questionNo + '. ' + currentQuestion.question

     currentQuestion.answers.forEach(answer => {
          const button = document.createElement('button')
          button.innerHTML = answer.text
          button.classList.add('btn')
          answerButtons.appendChild(button)
          if(answer.correct){
               button.dataset.correct = answer.correct
          }
          button.addEventListener('click', selectAnswer)
     })
}

function resetState(){
     nextButton.style.display = 'none'
     while(answerButtons.firstChild){
          answerButtons.removeChild(answerButtons.firstChild)
     }
}

function selectAnswer(e){
     const selectedBtn = e.target
     const isCorrect = selectedBtn.dataset.correct === 'true'
     if(isCorrect){
          selectedBtn.classList.add('correct')
          score++
     }
     else{
          selectedBtn.classList.add('incorrect')
     }
     Array.from(answerButtons.children).forEach(button => {
          if(button.dataset.correct === 'true'){
               button.classList.add('correct')
               button.classList.add('shake')
          }
          button.disabled = true
     })
     nextButton.style.display = 'block'
}

function showScore(){
     resetState()
     questionElement.innerHTML = `Tvé score je ${score} z ${questions.length}!`
     nextButton.innerHTML = 'Hrát znovu'
     nextButton.style.display = 'block'
}    


function handleNextButton(){
     currentQuestionIndex++
     if(currentQuestionIndex < questions.length){
          showQuestion()
     }
     else{
          showScore()
     }
}

nextButton.addEventListener('click', () => {
     if(currentQuestionIndex < questions.length){
          handleNextButton()
     }
     else{
          startQuiz()
     }
})


startQuiz()


