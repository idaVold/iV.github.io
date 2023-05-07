//Henter elementer fra DOM
let oppgaveEl = document.getElementById("oppgave")
let svarEl = document.getElementById("svar")
let sjekkBtn = document.getElementById("sjekk")
let nyOppgaveBtn = document.getElementById("ny_oppgave")
let resultatEl = document.getElementById("resultat")
let poengEl = document.getElementById("poeng")
let regneartEl = document.querySelector(".rA")
let sectionEl = document.querySelector("section")


//Legger til en lytter til knappen som sjekker svaret
sjekkBtn.addEventListener("click", sjekkSvar)
nyOppgaveBtn.addEventListener("click", lagOppgave)


//deklarer variabel for fasit
let fasit 

//Funksjon som lager ny oppgave
function lagOppgave(){
    sectionEl.style.backgroundColor = "palevioletred"
    svarEl.value = " "
    resultatEl.innerHTML = " "
    sjekkBtn.style = "display: block" //knappen viser seg igjen 


    //Lager tilfeldig heltall fra og med 0 til og med 10
    let a = Math.floor(Math.random()*11)
    let b = Math.floor(Math.random()*11)

    //Henter regneart
    let regneart = regneartEl.innerHTML
    if(regneart == "Addisjon"){
        a = Math.floor(Math.random()*101)
        b = Math.floor(Math.random()*101)
        oppgaveEl.innerHTML = `${a} + ${b} = ?`
        fasit = a+b
    }

    else if(regneart == "Multiplikasjon"){
         //Endrer teksten som er inni oppgaveEl og skriver oppgaven inn i HTML
        oppgaveEl.innerHTML = `${a} x ${b} = ?`

         //regner ut fasit
        fasit = a*b
    }

    else if(regneart == "Subtraksjon"){
        a = Math.floor(Math.random()*101)
        b = Math.floor(Math.random()*101)
        oppgaveEl.innerHTML = `${a} - ${b} = ?`
        fasit = a-b
    }
}

//Kaller funksjonen
lagOppgave()

let poeng = 0

//Funksjon som sjekker om vi har rett svar
function sjekkSvar(e){
    //e står for event object (hendelsesobjektet) alternativt skriver vi evt eller event 

    console.log(e)

    //hvis vi har trykket på enterknappen på pc-en eller sjekk knappen på nettsiden 
    if(e.key == "Enter" || e.target.id == "sjekk"){
        if(svarEl.value != ""){
            //Henter svaret fra brukeren
           let svar = Number(svarEl.value)
             //Sjekker om svaret er korekt
             if(svar === fasit){
           resultatEl.innerHTML = "Du svarte rett!";
           poeng += 1
           poengEl.innerHTML = "Antall poeng = " + poeng 
           sectionEl.style.backgroundColor = "rgb(157,193,131)"
       }
   
       else{
           resultatEl.innerHTML = "Du svarte feil"
           poengEl.innerHTML = "Antall poeng = " + poeng 
           sectionEl.style.backgroundColor = "#FF6961"
       }
   
        if(sjekkBtn.style = "display: none;"){
           nyOppgaveBtn = "display: block;"
           
       } 
   
         //Skjuler sjekk svar knappen slik at vi kun kan svare en gang
         sjekkBtn.style = "display: none;"
       }  
    }
}

//Legger til en lytter til input feltet
svarEl.addEventListener("keydown", sjekkSvar)


