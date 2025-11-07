const Gameboard = (function(){
        const winningPos = [
        [3, 6, 9], [2, 5, 8], [1, 4, 7],
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 5, 9], [3, 5, 7],
    ]

    const gameBoardArr = ["BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK"];

    function players(playerX, playerO) { // Creates Players

        function createPlayer(name, symbol) {
            return { name, symbol };
        }

        const player1 = createPlayer(playerX, "X");
        const player2 = createPlayer(playerO, "O");
        return { player1, player2 };
    }


    function winRoundChecker(playerObj){  // Checks For Win or Draw 
        for (let i = 0; i < winningPos.length; i++){
            //console.log("Current Winning Iteration: ", winningPos[i]);
            const currentCombination = winningPos[i];
            const firstPosWinner = currentCombination[0];
            const secondPosWinner = currentCombination[1];
            const thirdPosWinner = currentCombination[2];
            
            if (gameBoardArr[firstPosWinner - 1] == playerObj.symbol
                && gameBoardArr[secondPosWinner - 1] == playerObj.symbol
                && gameBoardArr[thirdPosWinner - 1] == playerObj.symbol) {
                    
                    return 1;

                
            }
        }
        if (!gameBoardArr.includes("BLANK")){
                console.log(gameBoardArr);
                return 0;
            }
        
    }


    function playerTurn(playerObj, position){ 
         position--;
         gameBoardArr[position] = playerObj.symbol;
         console.log("Current Player", playerObj.name);``
         console.log(gameBoardArr);
         winRoundChecker(playerObj);
    }
   
   



    
    return  {players,playerTurn , gameBoardArr, winRoundChecker};

})();


let aPlayers = Gameboard.players("Player1", "Player2");



const container = document.querySelector(".container");
const gridSquareLs = document.querySelectorAll(".gridSquare");
const gridSquare = document.querySelector(".gridSquare");
const currentTurnInsert = document.querySelector(".currentTurnInsert");
const winnerP = document.querySelector(".winnerP");
const startGameBtn = document.querySelector(".startGameBtn");
const restartBtn = document.querySelector(".restartBtn");



startGameBtn.addEventListener("click", function(e){
    const player1value = document.getElementById("player1Name").value;
    const player2value = document.getElementById("player2Name").value;
    console.log(player1value);
    aPlayers = Gameboard.players(player1value, player2value);
    console.log(aPlayers);
    displayLogic.renderGameboardArr();
    displayLogic.markSpot();


});

restartBtn.addEventListener("click" , function(e){


    Gameboard.gameBoardArr = ["BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK", "BLANK"];
    displayLogic.renderGameboardArr();
    displayLogic.markSpot();



});











const displayLogic = (function (){
     function renderGameboardArr(gameboardArray){
        gameboardArray = Gameboard.gameBoardArr;
        let counter = 0;
        gridSquareLs.forEach(gridSquare => {
            gridSquare.textContent = gameboardArray[counter];
            counter ++;
        });
        
    }
    function spotTaken(currentSquare){
        if (currentSquare == "BLANK"){
            return true
        }
        else{
            return false
        }
    }
    function markSpot(){
        let counter = 2;
        container.addEventListener("click", function(e){

            if (spotTaken(e.target.textContent)){

                console.log("click");
                if (e.target.classList.contains("gridSquare")){
                const targetSquare = e.target;
                const targetSquarePos = (Array.prototype.indexOf.call(targetSquare.parentNode.children, targetSquare)) + 1;
                console.log(targetSquarePos);
                if (counter == 100){
                    console.log("No More, Player 1 Won! ");
                };

                if (counter == 101){
                    console.log("No More, Player 2 Won! ");
                };

                if (counter == 102){
                    console.log("No More, It's a draw! ");
                };

                if (counter % 2 == 0 && counter != 100 && counter != 101 && counter != 102){
                    //player 1 Turn
                    currentTurnInsert.textContent = aPlayers.player2.name;
                    counter ++;
                    Gameboard.playerTurn(aPlayers.player1, targetSquarePos);
                    targetSquare.textContent = aPlayers.player1.symbol;
                }
                else if(counter % 2 != 0  && counter != 100 && counter != 101 && counter != 102){
                    currentTurnInsert.textContent = aPlayers.player1.name;
                    counter++;
                    Gameboard.playerTurn(aPlayers.player2, targetSquarePos);
                    targetSquare.textContent = aPlayers.player2.symbol;
                }
            }
            if (Gameboard.winRoundChecker(aPlayers.player1) == 1){
            console.log("Player 1 Won! ");
            winnerP.textContent = "Player 1 Wins!";
            counter = 100; 

            // Update Player 1 Score
                }
            else if (Gameboard.winRoundChecker(aPlayers.player2) == 1){
            console.log("Player 2 Won! ");
            winnerP.textContent = "Player 2 Wins!";
            counter = 101;
            

            // Update Player 2 Score
            }
            else if (Gameboard.winRoundChecker(aPlayers.player1) == 0|| Gameboard.winRoundChecker(aPlayers.player2) == 0){
            console.log("It's a draw");
            winnerP.textContent = "It's a draw!";
            counter = 102;
            }




            }
        });
    }
    return {renderGameboardArr, markSpot}
})();











