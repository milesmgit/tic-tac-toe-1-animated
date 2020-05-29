window.onload = function () {
    console.log('Wired Up!');
            // function to tell if X or O won
            // xoString is either 'X' or 'O' value
            // btnArray will have the innerText of either 'X' or 'O'
            const checkWinner = function(btnArray, xoString){
                // top row left to right 0, 1, 2
                if(btnArray[0].innerText === xoString && btnArray[1].innerText === xoString && btnArray[2].innerText === xoString  || 
                // middle row left to right  3, 4, 5
                btnArray[3].innerText === xoString  && btnArray[4].innerText === xoString && btnArray[5].innerText === xoString  ||
                // bottom row left to right 6, 7, 8
                btnArray[6].innerText === xoString && btnArray[7].innerText === xoString  && btnArray[8].innerText === xoString  ||
                // diagonal 0, 4, 8
                btnArray[0].innerText === xoString  && btnArray[4].innerText === xoString  && btnArray[8].innerText === xoString  ||
                // diagonal 2, 4, 6
                btnArray[2].innerText === xoString  && btnArray[4].innerText === xoString  && btnArray[6].innerText === xoString  ||
                // left top to bottom  0, 3, 6
                btnArray[0].innerText === xoString && btnArray[3].innerText === xoString  && btnArray[6].innerText === xoString  ||
                // middle top to bottom 1, 4, 7
                btnArray[1].innerText === xoString  && btnArray[4].innerText === xoString  && btnArray[7].innerText === xoString  ||
                // right top to bottom 2, 5, 8
                btnArray[2].innerText === xoString  && btnArray[5].innerText === xoString  && btnArray[8].innerText === xoString ){
                    return true;
                };
            }                   
    // will remove the instructions at start of game, and place back on game reset
    const instructionsDiv = document.querySelector('#tic-tac-toe');

    // grabbing playerOneScoreDiv to be used with local storage
    const playerOneScoreDiv = document.querySelector('#playerOneScoreDiv');

    // not sure i need this line since i am working with local storage
    let playerOneScore = 0;

    // holds the value of Player One Score
    playerOneScoreDiv.innerText = `Player One Score: ` + localStorage.getItem("playerOneScore");

    // grabbing playerTwoScoreDiv to be used with local storage
    const playerTwoScoreDiv = document.querySelector('#playerTwoScoreDiv');

    // not sure I need this line since I am working with local storage
    let playerTwoScore = 0;

    playerTwoScoreDiv.innerText = `Player Two Score: ` + localStorage.getItem("playerTwoScore");

    // audio file
    var rain = new Audio('audio/rain.mp3');

    // cat sound for a tie (cat game)
    var cat = new Audio('audio/cat.mp3');

    // audio file for explosion at game end
    var boom = new Audio('audio/boom.mp3');

    // grab audioBtn so I can turn on rain with eventListener
    const audioBtn = document.querySelector('.audioBtn');

    // start the rain sound
    audioBtn.addEventListener('click', function(){
        rain.play();
        
    });

    // grab .rain div so I can change its class to 
    // .rainOff using the rainOffBtn
    const rainDiv = document.querySelector('.rain');

    // starts the game and removes instructions from the screen
    // grab rainOffBtn to change class of the rain div 
    
    const rainOffBtn = document.querySelector('#rainOffBtn');
    // add event listener for click event to change class of
    // .rain div to .rainOff
    rainOffBtn.addEventListener('click', function(){
        // stop the rain effect so the user can click the squares.
        rainDiv.className = 'rainOff';
        // stop the rain sound
        rain.pause();
        instructionsDiv.style.display = 'none';
        // using this div to announce each player's turn; will position this with CSS
        winnerDiv.innerText = 'Player One\'s Turn';
    });

    const gameReset = document.querySelector('#gameReset');

    // game resets score and adds instructions to screen
    gameReset.addEventListener('click', function(){
        instructionsDiv.style.display = 'block';
        localStorage.setItem('playerOneScore', '0'); 
        localStorage.setItem('playerTwoScore', '0');
        location.reload();
    });

    const gridDivArray = document.querySelectorAll('.grid');

    let playerOneTurn = true;

    // loops through each item in the gridDivArray
    for (let i = 0; i < gridDivArray.length; i++){
        // create a button to be placed in each of the gridDivArray elements with class of .grid
        const squareBtn = document.createElement('button');

        // assign class name for css and logic testing.
        squareBtn.className = 'xClassBtn';
        
        // appends a button to each of the gridDivArray elements
        gridDivArray[i].append(squareBtn);
        
        // player one starts with X, changing the inner text to X
        // next we will change a flag to reflect the change of player turn.
        squareBtn.addEventListener('click', function(){    
            // audio file for user click on grid square.
            var soundEffect = new Audio('audio/soundEffect.mp3');
            soundEffect.play();
            
            // audio file for tie game.
            var tieGame = new Audio('audio/tie.mp3');

            // create a button array and test for winning combinations of 'X'
            const btnArray = document.querySelectorAll('.xClassBtn');

            // grabbing the body to add bacjgrounds pending on who wins
            const body = document.querySelector('body');

            // grabbing the winnerDiv to post the winner of the game
            const winnerDiv = document.querySelector('#winnerDiv');

            // audio file
            var noMercy = new Audio('audio/no_mercy.mp3');

            if(playerOneTurn){
                if(this.innerText !== 'O' && this.innerText !== 'X'){
                    this.innerText = 'X';
                    // using this div to announce each player's turn; will position this with CSS
                    winnerDiv.innerText = 'Player Two\'s Turn';
                    playerOneTurn = false;
                }
                // if true for 'X' run statements for Player One
                if(checkWinner(btnArray, 'X')){   
                    winnerDiv.innerText = 'Player One Wins!!!';

                    for(let i = 0; i < gridDivArray.length; i ++){
                    // i want to change the class of buttons so that the game board blows up, and scatters.
                    gridDivArray[i].className ="gameOver" + i;
                    
                    }
                    // boom audio
                    boom.play();
                    
                    // audio mp3
                    noMercy.play();
                    
                    // changing the background image of the body when player one wins.
                    body.style.backgroundImage = "url(img/cool.jpg)";
                    body.style.backgroundSize = "cover";

                    playerOneScore = localStorage.getItem("playerOneScore");
                    // using local storage to add 1 to playerOneScoreDiv
                    localStorage.setItem('playerOneScore', parseInt(playerOneScore) + 1); 
                    
                    playerOneScoreDiv.innerText = `Player One Score: ` + localStorage.getItem("playerOneScore");

                    setTimeout(function(){ 
                        location.reload();
                     }, 12000);
                    return;
                }
        // checking for a tie using a for loop to count to 9 by the number of btn with
        // either an innerText content of 'X' || 'O'
        // counter will hold tha value of 'X' || 'O' (s)
        let counter = 0;

        for(let i = 0; i < btnArray.length; i++){
            if(btnArray[i].innerText === 'X' || btnArray[i].innerText === 'O'){
                counter += 1;
            }
            if(counter === 9){      
                // changing the background image of the body when player one wins.
                body.style.backgroundImage = "url(img/cat.jpg)";
                body.style.backgroundSize = "cover";
                winnerDiv.innerText = 'Game is a Tie (Cat Game)';
                // boom audio for exploding squares
                boom.play();

                // cat sound for tie
                cat.play();

                // funny sound for tie game
                tieGame.play();
                // for loop for the gridDivArray
                for(let i = 0; i < gridDivArray.length; i ++){
                    // i want to change the class of buttons so that the game board blows up, and scatters.
                    gridDivArray[i].className ="gameOver" + i;     
                }
                setTimeout(function(){ 
                    location.reload();
                 }, 12000);
                return;
            }
        }    
            }     
            if (this.innerText !== 'X' && this.innerText !== 'O'){
                
                this.innerText = 'O';
                    
                // using this div to announce each player's turn; will position this with CSS
                winnerDiv.innerText = 'Player One\'s Turn';
            
                // testing for a winner
                if(checkWinner(btnArray, 'O')){
                    winnerDiv.innerText = 'Player Two Wins!!!';

                    // maybe I could rewrite this as a function to make more dry
                    for(let i = 0; i < gridDivArray.length; i ++){
                        // i want to change the class of buttons so that the game board blows up, and scatters.
                        gridDivArray[i].className ="gameOver" + i;
                    }

                    // boom audio
                    boom.play();

                    // audio mp3
                    noMercy.play();

                    // changing the background image of the body when player two wins.
                    body.style.backgroundImage = "url(img/cool2.jpg)";
                    body.style.backgroundSize = "cover";

                    playerTwoScore = localStorage.getItem("playerTwoScore");
                    // using local storage to add 1 to playerTwoScoreDiv
                    localStorage.setItem('playerTwoScore', parseInt(playerTwoScore) + 1); 
                    
                    playerTwoScoreDiv.innerText = `Player Two Score: ` + localStorage.getItem("playerTwoScore");

                    setTimeout(function(){ 
                        location.reload();
                     }, 12000);
                    return;   
                }
                playerOneTurn = true;
            }
        }); 
    };
}
