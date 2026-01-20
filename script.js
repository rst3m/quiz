const questionDiv = document.getElementById('question')
const optionADiv = document.getElementById('optionA')
const optionBDiv = document.getElementById('optionB')
const optionCDiv = document.getElementById('optionC')
const optionDDiv = document.getElementById('optionD')
const optionEDiv = document.getElementById('optionE')
const nextButton = document.getElementById('next')
const questionInfo = document.getElementById('question-counter') 
const trueCountInfo = document.getElementById('true-counter')
const wrongCountInfo = document.getElementById('wrong-counter')

const FROM = sessionStorage.getItem('from') - 1
const TO = sessionStorage.getItem('to') 
const COUNT = sessionStorage.getItem('count')
const QUESTIONS = JSON.parse(sessionStorage.getItem('questions'))

let answered = false
let trueCount = 0
let index = 0

const questions = QUESTIONS.slice(FROM, TO)
const finalQuestions = []



const len = questions.length
for(let i = len; i > len - COUNT; i--){
    const index = Math.floor(i * Math.random())
    finalQuestions.push(questions.at(index))
    questions.splice(index, 1)
}


showQuestion(finalQuestions.at(index))
nextButton.addEventListener('click', (e) => {
    if (index == COUNT - 1){
        alert(`${trueCount} true answers from ${COUNT} questions`)
        window.location.href = 'index.html'
    }
    else{
        showQuestion(finalQuestions.at(++index))
    }
})





function shuffle(arr){
    for (let i = arr.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
}}





function showQuestion(question){
    questionInfo.innerHTML = `${COUNT} / ${index + 1}`
    trueCountInfo.innerHTML = trueCount
    wrongCountInfo.innerHTML = index - trueCount

    for(let opt of [optionADiv, optionBDiv, optionCDiv, optionDDiv, optionEDiv]){
        if(opt.dataset.isTrue == 'true'){
            console.log('ok')
            opt.removeEventListener('click', trueOptCallBack)
        } else {
            opt.removeEventListener('click', wrongOptCallBack)
        }

        opt.dataset.isTrue = false
        opt.style.backgroundColor = 'rgb(255, 253, 240)'
    }



    answered = false

    questionDiv.innerHTML = question.question

    const options = ['optionA', 'optionB', 'optionC', 'optionD', 'optionE']
    shuffle(options)
    
    const trueOption = document.getElementById(options.pop())    
    trueOption.innerHTML = question['true-answer']
    trueOption.dataset.isTrue = true
    trueOption.addEventListener('click', trueOptCallBack)

    for(let wrongOption of question["wrong-answers"]){
        const opt = document.getElementById(options.pop())
        opt.innerHTML = wrongOption
        opt.addEventListener('click', wrongOptCallBack)
    }



    // for(let option of options)

}






function trueOptCallBack (e) {
    if(answered) return 

    e.target.style.backgroundColor = 'green'
    trueCount ++

    answered = true

    // e.target.removeEventListener('click', trueOptCallBack)
}


function wrongOptCallBack (e) {
    if(answered) return 

    e.target.style.backgroundColor = 'red'

    const trueOpt = document.querySelector("[data-is-true='true']")
    trueOpt.style.backgroundColor = 'green'

    answered = true

    // e.target.removeEventListener('click', wrongOptCallBack)
}