const subjectField = document.querySelector('.subject')
const descrField = document.querySelector('.description')
const totalQuestionRadio = document.querySelectorAll('.total-question')
const questionField = document.querySelector('.question-field')
const detailTextArea = document.querySelector('.detail-answer')
const okDetailBtn = document.querySelector('.ok-detail-btn')
const trueAnswerRadio = document.querySelectorAll('.true-answer')
const questionContainer = document.querySelector('.container-questions')

let html = ``
let index = 0

const SetTotalQuestion = (num) => {
    html = ``
    for(let i = 1; i <= num; i++){
        html  += `<div class="mt-[1px] py-6  w-full rounded-md p-[20px] shadow-lg bg-white sm:py-12 mb-[10px]">`
        html += `<div class="question-container mt-[10px]">
        <div class="question flex align-center gap-[1px]">
          <h3 class="number mt-[4px]">${i}.</h3>
          <input type="text" class="question-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write question" name="question" required>
        </div>
        <div class="answer-container mt-[70px]">
          <div class="wrapper flex gap-[10px] align-center">
            <div class="answer flex flex-col gap-[10px]">
              <div class="answer-wrapper">
                <label for="answer-a">a.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-a" required>
              </div>
              <div class="answer-wrapper">
                <label for="answer-b">b.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-b" required>
              </div>
              <div class="answer-wrapper">
                <label for="answer-c">c.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-c" required>
              </div>
            </div>
      
            <div class="detail-wrapper flex  gap-[30px]">
              <div class="wrapper flex flex-col gap-[10px]">
                <label for="detail-answer" class="detail-btn btn btn-xs mt-[5px]">Detail</label>
                  <label for="detail-answer" class="detail-btn btn btn-xs mt-[15px]">Detail</label>
                  <label for="detail-answer" class="detail-btn btn btn-xs mt-[15px]">Detail</label> 
              </div>
              <div class="wrapper-set-true flex flex-col ml-[30px]">
                <div class="title mt-[-40px]">
                  <h2>Choose true answer</h2>
                </div>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[22px]" value="" required/>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[23px]" value="" required/>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[24px]" value="" requireds/>
              </div>
            </div>
          </div>
          
        </div>
      </div>`
        html += `</div>`
        
    }   
    questionContainer.innerHTML = html
    const answerField = document.querySelectorAll('.answer-field')
    const detailBtn = document.querySelectorAll('.detail-btn')
    detailBtn.forEach((btn,i) => {
    btn.addEventListener('click',e => {
      let value = answerField[i].value
      index = i
      SetAnswerValueToDetail(value)
    })
  })
  okDetailBtn.addEventListener('click',() => {
    answerField[index].value = detailTextArea.value
  })
}

const SetDefaultTotalQuestion = () => {
    html = ``
    for(let i = 1; i <= 5; i++){
        html  += `<div class="mt-[1px] py-6  w-full rounded-md p-[20px] shadow-lg bg-white sm:py-12 mb-[10px]">`
        html += `<div class="question-container mt-[10px]">
        <div class="question flex align-center gap-[1px]">
          <h3 class="number mt-[4px]">${i}.</h3>
          <input type="text" class="question-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write question" name="question" required>
        </div>
        <div class="answer-container mt-[70px]">
          <div class="wrapper flex gap-[10px] align-center">
            <div class="answer flex flex-col gap-[10px]">
              <div class="answer-wrapper">
                <label for="answer-a">a.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-a" required>
              </div>
              <div class="answer-wrapper">
                <label for="answer-b">b.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-b" required>
              </div>
              <div class="answer-wrapper">
                <label for="answer-c">c.</label>
                <input type="text" class="answer-field px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[120px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Write answer" name="question" id="answer-c" required>
              </div>
            </div>
      
            <div class="detail-wrapper flex  gap-[30px]">
              <div class="wrapper flex flex-col gap-[10px]">
                <label for="detail-answer" class="detail-btn btn btn-xs mt-[5px]">Detail</label>
                  <label for="detail-answer" class="detail-btn btn btn-xs mt-[15px]">Detail</label>
                  <label for="detail-answer" class="detail-btn btn btn-xs mt-[15px]">Detail</label> 
              </div>
              <div class="wrapper-set-true flex flex-col ml-[30px]">
                <div class="title mt-[-40px]">
                  <h2>Choose true answer</h2>
                </div>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[22px]" value="" required/>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[23px]" value="" required/>
                <input type="radio" name="radio-4" class="true-answer radio radio-accent mt-[24px]" value="" required/>
              </div>
            </div>
          </div>
          
        </div>
      </div>`
        html += `</div>`
    }
    questionContainer.innerHTML = html
    const answerField = document.querySelectorAll('.answer-field')
    const detailBtn = document.querySelectorAll('.detail-btn')
    detailBtn.forEach((btn,i) => {
    btn.addEventListener('click',() => {
      let value = answerField[i].value
      index = i
      SetAnswerValueToDetail(value)
    })
  })

  okDetailBtn.addEventListener('click',() => {
    answerField[index].value = detailTextArea.value
  })
}
SetDefaultTotalQuestion()
totalQuestionRadio.forEach(btn => {
    btn.addEventListener('change',(e) => {
        let num = parseInt(e.target.defaultValue)
        SetTotalQuestion(num)
    
    })
})

const SetAnswerValueToDetail = (param) => {
    detailTextArea.value = param
}
