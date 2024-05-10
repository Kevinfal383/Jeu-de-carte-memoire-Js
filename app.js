const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function retourneCarte(){

    if (verouillage === true){
        return;
    }

    //ses noeux et ces enfants y compris les retours à la ligne; là on a selectionné 1 la class soit double-face
    this.childNodes[1].classList.toggle('active')

    //permet de stocker le 1er et 2eme carte clicker
    if(!carteRetournee){

        carteRetournee = true;
        premiereCarte = this; 
        return;
    }
    carteRetournee = false;
    secondeCarte = this;
    //console.log(premiereCarte, secondeCarte);

    correspondance();
}

function correspondance(){
     
    if (premiereCarte.getAttribute('data-attribut') === secondeCarte.getAttribute('data-attribut')) {
        //contraire de addEventListener ; enleve l'evenement de click de retouneCarte
        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        verouillage = true;
        //laisser les 2 carte 1s avant de les retourner, le 1000 en bas c'est la seconde
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;
        }, 1000)
    }
}

function aleatoire(){
    cartes.forEach(carte => {
        //math.random retourne des nombre entre 0 et 1 avec 1 non inclut
        //math.floor retourne des nombre avec virgule sans virgule ex: 2,3 = 2
        //ex = math.floor(0,2 * 12) = math.floor(2,4) = 2
        let randomPosition = Math.floor(Math.random() * 12);
        carte.style.order = randomPosition;
    })
}
aleatoire();