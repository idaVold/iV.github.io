//Henter elementer fra DOM

let carousel = document.querySelector(".carousel")
let arrowIcons = document.querySelectorAll(".wrapper i")
firstImg = carousel.querySelectorAll("img")[0]

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchstart", dragging)

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchmove", dragStart)

carousel.addEventListener("mouseup", dragStopp)
carousel.addEventListener("mouseleave", dragStopp)
carousel.addEventListener("touchend", dragStopp)

let isDragStart = false,isDragging = false, prevPageX, prevScrollLeft, positionDiff;



function showHideIcons(){
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth
    if(carousel.scrollLeft == 0){
        arrowIcons[0].style.display = "none"
    }
    
    else{
        arrowIcons[0].style.display = "block"
    }

    if(carousel.scrollLeft == scrollWidth){
        arrowIcons[1].style.display = "none"
    }
    
    else{
        arrowIcons[1].style.display = "block"
    }

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14 //får bredden til første img og legger til 14 i margin value
        if(icon.id == "left"){
            carousel.scrollLeft -= firstImgWidth
        }
        else{
            carousel.scrollLeft += firstImgWidth
        }
        setTimeout(() => showHideIcons(), 60)
    })
})


function autoSlide(){
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return
    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 14
    let valDifference = firstImgWidth - positionDiff
    
    if(carousel.scrollLeft > prevScrollLeft){
        if(positionDiff > firstImgWidth / 3){
            carousel.scrollLeft += valDifference
        }

        else{
            carousel.scrollLeft -=positionDiff
        }
    }


}



//funksjoner som gjør at bildene beveger seg når vi holder musen nede
function dragStart(e){
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft
}
function dragging(e){
    e.preventDefault()
    if(!isDragStart) return;
    isDragging = true
    carousel.classList.add("dragging")
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    showHideIcons()
}

function dragStopp(){
    isDragStart = false
    if(!isDragging) return
    isDragging = false
    carousel.classList.remove("dragging")
    autoSlide()
}