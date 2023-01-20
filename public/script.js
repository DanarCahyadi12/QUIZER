//Count total description
const countEl = document.querySelector('.count')
const descInput = document.querySelector('.description')
let countNum = 0
descInput.addEventListener('keydown',e => {
    let {code} = e
    console.log(code)
    if(countNum >= 255 &&  code !== 'Backspace' && code !== 'ArrowLeft'){
        e.preventDefault()
    }
})
descInput.addEventListener('input',e => {
    let value = e.target.value
    countNum = value.length
    countEl.innerHTML = countNum
})


//delete profile 
const delProfileBtn = document.querySelector('.del-profile')
console.log(delProfileBtn)
const DeleteProfileImg = (endpoint) => {
    fetch(endpoint,{
        method : "DELETE"
    }).then(res => res.json())
    .then(data => window.location.href = data.redirect)

    
}
delProfileBtn.addEventListener('click',e => {
    const path =e.target.dataset.id
    const endpoint = `http://localhost:8000/profile/:${path}`
    DeleteProfileImg(endpoint)

})

//end delete profile

