const menuBtn = document.querySelector(".menu-btn")
const bodyclk = document.querySelector(".body")
let menuOpen = false
menuBtn.addEventListener("click", () => {
    if(!menuOpen) {
        menuBtn.classList.add("open");
        menuOpen = true
    } else {
        menuBtn.classList.remove("open");
        menuOpen = false
    }
bodyclk.addEventListener("click", () => {
    if(menuOpen){
        bodyclk.classList.remove("open")
        menuOpen = false
    }
})
})