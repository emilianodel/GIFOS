const plus = document.getElementById("plus")
const section_six = document.querySelector('.section_six')
const section_five = document.querySelector('.section_five')
section_six.style.display = 'none'

plus.addEventListener('click', e => {
    e.preventDefault();
    section_one.style.display = 'none'
    section_two.style.display = 'none'
    section_three.style.display = 'none'
    section_four.style.display = 'none'
    section_five.style.display = 'none'
    section_line.style.display = 'none'
    section_six.style.display = 'inherit'

})