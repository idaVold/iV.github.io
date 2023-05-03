//Pil
let gotopbtn = document.querySelector(".gotopbtn")

window.addEventListener("scroll", harScrollet)

function harScrollet(){
    if(window.scrollY > 500){
        gotopbtn.style.display = "grid"
    }

    else{
        gotopbtn.style.display = "none"
    }
}



//bytting av bilder
let rosa = document.querySelector(".rosa")
let beige = document.querySelector(".beige")
let gronn = document.querySelector(".grønn")
let lilla = document.querySelector(".lilla")
let imgKjole = document.querySelector(".imgKjole")

rosa.addEventListener("click", skiftbilde)
beige.addEventListener("click", skiftbilde)
gronn.addEventListener("click", skiftbilde)
lilla.addEventListener("click", skiftbilde)

function skiftbilde(evt){
    let button = evt.target
    let kjoleBilde = button.getAttribute("data-bilde")
    imgKjole.src = kjoleBilde
} 








    
    

    



    