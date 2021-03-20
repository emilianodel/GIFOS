
// menu hamburguesa

let bars = document.getElementById("bars");
let barContainer = document.getElementById("bar-container");
let menu = document.getElementById("menu");

const navmenu = window.matchMedia("(max-width:375px)");
console.log(navmenu)

navmenu.addEventListener("change", event => {
    if (event.matches) {
        menu.style.display = "none"
    }
    else {
        menu.style.display= "block"
    }
})

barContainer.addEventListener("click", () => {
    if (menu.style.display === "none"){
        menu.style.display ="flex"
        bars.classList.remove("fa-bars");
        bars.classList.add("fa-times");
    }
    else{
        menu.style.display ="none"
        bars.classList.remove("fa-times");
        bars.classList.add("fa-bars");
    }
})

// hoover, active y mouseout
document.getElementById("plus").addEventListener("mouseover", mouseOver)
document.getElementById("plus").addEventListener("mouseout", mouseOut)
document.getElementById("plus").addEventListener("click", mouseClick)
document.querySelector(".carousel-prev").addEventListener("mouseover", prevButton)
document.querySelector(".carousel-prev").addEventListener("mouseout", prevButtonout)
document.querySelector(".carousel-next").addEventListener("mouseover", nextButton)
document.querySelector(".carousel-next").addEventListener("mouseout", nextButtonout)

function mouseOver() {
    document.getElementById("plus").src ="/Images/CTA-crear-gifo-hover.svg";
}

function mouseOut() {
    document.getElementById("plus").src = "/Images/button-crear-gifo.svg";
}

function mouseClick (){
    document.getElementById("plus").src = "/Images/CTA-crear-gifo-active.svg";
}

function prevButton () {
    document.querySelector(".carousel-prev").src = "/Images/button-slider-left-hover.svg"
}

function prevButtonout () {
    document.querySelector(".carousel-prev").src = "/Images/button-slider-left.svg"
}

function nextButton () {
    document.querySelector(".carousel-next").src = "/Images/button-slider-right-hover.svg"
}

function nextButtonout () {
    document.querySelector(".carousel-next").src = "/Images/button-slider-right.svg"
}

