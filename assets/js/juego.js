( () => {
    'use strict'
    

    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A" ,"J", "Q", "K"];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    const divCartasJugador = document.getElementById('jugador-cartas')
    const divCartasComputadora = document.getElementById('computadora-cartas')
    const puntosHTML = document.querySelectorAll('small')

    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");

    // funcion para crear deck
    const crearDeck = () => {
        for (let i = 2; i<= 10; i++){
            for (let tipo of tipos) {
                deck.push( i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales){
                deck.push(especial + tipo)
            }
        }

        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    // funcion para pedir carta
    const pedirCarta = () => {

        if ( deck.length === 0 ){
            throw "no hay cartas en el deck"
        }

        let carta = deck.pop();
        return carta;
    }

    pedirCarta();

    const valorCarta = (carta) => {
        const valor = carta.substring(0,carta.length - 1 );
        return (isNaN(valor))?
                (valor === "A" ) ? 11 : 10 
                : valor * 1;
    }

    const turnoComputadora = ( puntosMinimos ) => {
        
        do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );

        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img')
        imgCarta.src= `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append (imgCarta)

        if (puntosMinimos > 21 ){
            break;
        }
        
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        setTimeout( () => {


        if ( puntosComputadora === puntosMinimos) {
            alert("EMPATE! nadie gana")
        } else if ( puntosMinimos > 21) {
            alert("Lo siento! perdiste")
        } else if (puntosComputadora > 21 ) {
            alert("Ganaste!!")
        } else {
            alert("computadora gana")
        }
        }, 50);
    }


    btnPedir.addEventListener('click', function() {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta( carta );

        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img')
        imgCarta.src= `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta')

        divCartasJugador.append( imgCarta )

        if (puntosJugador > 21) {
            console.log("perdiste");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        
        } else if ( puntosJugador === 21){
            console.log("21 daleEEE!!!")
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }
    })

    btnDetener.addEventListener('click', function() {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    })

    btnNuevo.addEventListener('click', function() {
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = "";
        divCartasJugador.innerHTML = "";
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })


}) ();
