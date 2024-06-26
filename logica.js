// Variables globales
var numberOfClicks = 0;
var player = 'Jugador 1';
var hiddenButton = false;
var hiddenBoard = false;
var winner = false;
var playerOneArray = [];
var playerTwoArray = [];


// Función para manejar el inicio del juego
function handleGameStart(){
    document.getElementById('board').hidden = false;
    player = 'Jugador 1';
    startButon = document.getElementById('startButton');
    startButon.addEventListener('click',showDivs);
   
    
}
function hadleGameRestart(){
    document.getElementById('restartButton').addEventListener('click',restartGame)
}

// Función para contar el número de clics en las celdas
const cellCount = () => {
    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleCellClick);
       
    }
    
}

// Función para actualizar el jugador actual en la interfaz
function currentPlayer() {
    var current = ''
    if (numberOfClicks % 2 !== 0 || numberOfClicks == 1) {
        current = 'Jugador 2';
        var currentPlayerElement = document.getElementById('player');
    currentPlayerElement.textContent = 'Es el turno del: ' + current;

    } else if(numberOfClicks % 2 == 0) {
        current = 'Jugador 1';
        var currentPlayerElement = document.getElementById('player');
    currentPlayerElement.textContent = 'Es el turno del: ' + current;
    }
}
    
// Función para aumentar el número de clics
function sumNumberOfClicks() {
    numberOfClicks++;
    
}

// Función para marcar X o O en la celda según sea necesario
const playround = (elementId) => {
    var box = document.getElementById(elementId);
    if (player === 'Jugador 2') {
        box.textContent = 'O';
        token = 'O'
    } else {
        box.textContent = 'X';
        token = 'X';
    }
    
}

// Función para cambiar de jugador
function switchPlayer() {
    
    if (numberOfClicks % 2 !== 0 || numberOfClicks == 1) {
        player = 'Jugador 2';
    } else if(numberOfClicks % 2 == 0) {
        player = 'Jugador 1';
    }
    
}

// Manejador de eventos para el clic en una celda
function handleCellClick(event) {
    var targetContent = event.target.innerHTML;
    if (targetContent === 'X' || targetContent === 'O' || hiddenButton == false) {
        return;
    }
    currentPlayer()
    switchPlayer();
    sumNumberOfClicks();
    currentPlayer()
    playround(event.target.id);
    handlerSquareCounter(event);
}

// Función para mostrar las celdas y el jugador cuando se inicia el juego
function showDivs(){
    hiddenButton = true;
    document.getElementById('startButton').hidden = hiddenButton;
    document.getElementById('player').hidden = false;
}


// Función para manejar el conteo de casillas pulsadas por cada jugador y almacenarlas en un array 
function handlerSquareCounter(event){
    if(player == 'Jugador 1'){
        playerOneArray.push(event.target.id);
    } else {
        playerTwoArray.push(event.target.id);
    }
    cheackTheWinner(playerOneArray);
    cheackTheWinner(playerTwoArray);
}

// Función para verificar si hay un ganador
function cheackTheWinner(array){
    let hasOne = array.includes('1');
    let hasTwo = array.includes('2');
    let hasThree = array.includes('3');
    let hasFour = array.includes('4');
    let hasFive = array.includes('5');
    let hasSix = array.includes('6');
    let hasSeven = array.includes('7');
    let hasEight = array.includes('8');
    let hasNine = array.includes('9');

    if (hasOne && hasTwo && hasThree) {
        hiddenButton = false;
        winner = true;
        
        winnerBoard();
    } else if (hasFour && hasFive && hasSix) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasSeven && hasEight && hasNine) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasOne && hasFour && hasSeven) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasTwo && hasFive && hasEight) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasThree && hasSix && hasNine) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasOne && hasFive && hasNine) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    } else if (hasThree && hasFive && hasSeven) {
        hiddenButton = false;
        winner = true;
        winnerBoard();
    }else{
        drawBoard();
    }
}

// Función para mostrar el mensaje de ganador y ocultar el tablero
function winnerBoard(){
    if(winner == true){
        var ganador = document.getElementById('winner');
        var parrafoGanador = document.createElement('h1');
        parrafoGanador.textContent = 'El '+ player + ' ha ganado la partida !';
        ganador.appendChild(parrafoGanador);
        ganador.hidden = false;
        document.getElementById('board').hidden = true;
        document.getElementById('player').hidden = true;
        document.getElementById('winner-trophy').hidden = false;
        document.getElementById('restartButton').hidden = false;
        hadleGameRestart()
        
       
    }
    
}
//Funcion para el caso en el que no haya
function drawBoard(){
    if(numberOfClicks == 9 && winner == false){
        var empate = document.getElementById('draw');
        // Verificar si ya hay un elemento de empate creado
        if (empate.childElementCount === 0) {
            var parrafoEmpate = document.createElement('h1');
            parrafoEmpate.textContent = 'WOW! La partida ha terminado en empate';
            empate.appendChild(parrafoEmpate);
        }
        document.getElementById('hands').hidden = false;
        document.getElementById('board').hidden = true;
        document.getElementById('player').hidden = true;
        document.getElementById('draw').hidden = false;
        document.getElementById('restartButton').hidden = false;
        hhadleGameRestart()
        
        console.log('La partida ha empatado')
    }
}

function restartGame(){
    window.location.reload();
    console.log('restart')
}

// Inicia el juego
handleGameStart();
cellCount();
