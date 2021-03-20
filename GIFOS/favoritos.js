const section_one = document.querySelector(".section_one")
const section_two = document.querySelector(".section_two")
const section_three = document.querySelector(".section_three")
const section_line = document.querySelector(".section_line")
const fav_id = document.getElementById("fav_click")
const logo = document.querySelector(".logo")
section_three.style.display = 'none'

fav_id.addEventListener('click', e => {
    e.preventDefault();
    section_one.style.display = 'none'
    section_two.style.display = 'none'
    section_three.style.display = 'inline'
    section_four.style.display = 'none'
    section_six.style.display = 'none'
    section_line.style.display = 'none'

})

//Gifos a la pagina principal

logo.addEventListener('click', e =>{
    window.location.reload();
})
