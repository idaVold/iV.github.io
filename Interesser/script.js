//Henter elementer fra DOM
let carousel = document.querySelector(".carousel")
/* henter ikonpilene */
let arrowIcons = document.querySelectorAll(".wrapper i")
firstImg = carousel.querySelectorAll("img")[0] /* henter det første bilde i karusellen */
/* vi bruker ikke doucment men carousel som er classen til div-elementet alle bildene er i*/

/* legger til eventlisteners m */
carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mouseup", dragStopp)
carousel.addEventListener("mouseleave", dragStopp)
carousel.addEventListener("touchend", dragStopp)

// definerer ulike variabler 
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

// justerer om pilene skal vises eller ikke 
function showHideIcons(){
    // en variabel som gir meg bredden på det skjulte området av karusellen 
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth

    // hvis scrollbaren er helt til venstre skal den første pilen ikke vises (altså pilen til venstre) 
    if(carousel.scrollLeft == 0){ 
        arrowIcons[0].style.display = "none"
    }
    
    else{
        arrowIcons[0].style.display = "block"
    }

    // hvis vi har kommet helt til høyere skal ikke pilen til høyre vises 
    if(carousel.scrollLeft == scrollWidth){
        arrowIcons[1].style.display = "none"
    }
    
    else{
        arrowIcons[1].style.display = "block"
    }
}

//kan også bruke for-løkke isteden for forEach
arrowIcons.forEach(icon => {
    icon.addEventListener("click", function() {
        let firstImgWidth = firstImg.clientWidth + 14 //får bredden til første img og legger til 14 i margin value
        if(icon.id == "left"){
            carousel.scrollLeft -= firstImgWidth // begever seg mot venstre 
        }
        else{
            carousel.scrollLeft += firstImgWidth // beveger seg mot høyre 
        }

        // legger til en funksjon som gjør at showHideIcons blir kjørt etter en forsinkelse på 60 milliseknuder 
        setTimeout(function(){
            showHideIcons()
        }, 60)
    })
})


function autoSlide(){
    // sjekker om den har kommet helt til høyere, hvis den har det skal den returnes uten å gjøre noe 
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return

    //Finner differansen mellom den forrige scrollLeft posisjonen og den nåværende scrollLeft-posisjonen
    positionDiff = carousel.scrollLeft - prevScrollLeft
    //Absoluttverdi
    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 14
    let valDifference = firstImgWidth - positionDiff
    
    //hvis den nåværende scrollLeft posisjonen er større en den forrige så har den rullet til høyere
    if(carousel.scrollLeft > prevScrollLeft){
        if(positionDiff > firstImgWidth / 3){
            carousel.scrollLeft += valDifference // får den til å rulle videre i samme retning som før 
        }

        else{
            carousel.scrollLeft -=positionDiff // får den til å rulle tilbake til den forrige posisjonen før den begynte å rulle 
        }
    }
}  


//funksjoner som gjør at bildene beveger seg når vi holder musen nede
function dragStart(e){
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX; //mus = e.pageX, fingeren = e.touches[0].pageX
    prevScrollLeft = carousel.scrollLeft 
}

function dragging(e){
    e.preventDefault()
    if(!isDragStart) return; //sjekker verdien til isDragStart, hvis den er false skjer det ingenting
    isDragging = true
    carousel.classList.add("dragging") //legger til dragging som classe
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX //finner forskjellen nåværende posisjon og når man begynte
    carousel.scrollLeft = prevScrollLeft - positionDiff  //gjør at bildene beveger seg i motsatt retning av bevegelsen til fingeren
    showHideIcons()
}

function dragStopp(){
    isDragStart = false
    if(!isDragging) return 
    isDragging = false
    carousel.classList.remove("dragging") //fjerner classen 
    autoSlide()
} 