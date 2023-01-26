//Count max length description
const currentDescLengthEl = document.querySelector('.count')
const descInput = document.querySelector('.description')
let currentDescLength = 0
descInput.addEventListener('keydown',e => {
    let {code} = e
    if(currentDescLength >= 255 &&  code !== 'Backspace' && code !== 'ArrowLeft'){
        e.preventDefault()
    }
})
descInput.addEventListener('input',e => {
    let value = e.target.value
    currentDescLength = value.length
    currentDescLengthEl.innerHTML = currentDescLength
})


//delete profile 
const delProfileBtn = document.querySelector('.del-profile')
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
