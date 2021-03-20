const section_four = document.querySelector(".section_four")
const mis_gifos = document.getElementById("mis_gifos")
section_four.style.display = 'none'


mis_gifos.addEventListener('click', e => {
    e.preventDefault();
    section_one.style.display = 'none'
    section_two.style.display = 'none'
    section_three.style.display = 'none'
    section_four.style.display = 'inline'
    section_six.style.display = 'none'
    section_line.style.display = 'none'

})