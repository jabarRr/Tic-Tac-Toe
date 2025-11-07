/*
gameboardObj = {
    players: Check
    grid: Check
    playerTurn(): Check
    winRound(): Check
    winGame();
    playGame; 
}
*/
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
   




    function gameFlow(){
        players("Player 1", "Player2");
        
        playerTurn(players[0])
        playerTurn(players[1])   

        

    }


    
        
        


    


    
    return  {players,playerTurn , gameBoardArr, winRoundChecker, gameFlow};

})();


Gameboard.gameFlow

console.log("GameBoard Array", Gameboard.gameBoardArr);
//let playersLs = Gameboard.players("Jack", "Bill");

//console.log("Player 1: " , playersLs.player1);
//console.log("Player 2: " , playersLs.player2);

//Gameboard.playerTurn(playersLs.player1, 1); 
//Gameboard.playerTurn(playersLs.player2, 3);
//Gameboard.playerTurn(playersLs.player1, 2);
//Gameboard.playerTurn(playersLs.player2, 4);
//Gameboard.playerTurn(playersLs.player1, 5);
//Gameboard.playerTurn(playersLs.player2, 8);
//Gameboard.playerTurn(playersLs.player1, 6);
//Gameboard.playerTurn(playersLs.player2, 9);

//Gameboard.playerTurn(playersLs.player1, 7);


const container = document.querySelector(".container");
const gridSquareLs = document.querySelectorAll(".gridSquare");
const gridSquare = document.querySelector(".gridSquare");
const totalGridSquares= container.childElementCount;
console.log("Grid has" , totalGridSquares);


const displayLogic = (function (){

    function renderGameboardArr(gameboardArray){
        let counter = 0;
        gridSquareLs.forEach(gridSquare => {
            gridSquare.textContent = gameboardArray[counter];
            counter ++;
        });
        
    }
    
    function markSpot(playerObj, gameboardArray){
        

        container.addEventListener("click", (e) => {
             if (e.target.classList.contains("gridSquare")){
                const parentContainer = e.target.parentElement;
                const currentSquare = e.target;
                console.log("HEYYYY");
                console.log(currentSquare.textContent);
                Gameboard.winRoundChecker(playerObj);

                if (spotTaken(currentSquare.textContent) && Gameboard.winRoundChecker(playerObj) != 1 && Gameboard.winRoundChecker(playerObj) != 0){
                    console.log("Spot not taken");


                    currentSquare.textContent = playerObj.symbol;

                
                    for (let i = 0; i < parentContainer.childElementCount; i++){ // This for loop adds the symbol to the correct spot in array.
                        const child = parentContainer.children[i];
                            if (child == currentSquare){
                                
                                console.log(gameboardArray);
                                console.log(i);
                                let currentVal = i + 1;
                                Gameboard.playerTurn(playerObj, currentVal);

                                console.log(gameboardArray);
                            }
                    }
                }


                else if(Gameboard.winRoundChecker(playerObj) == 1){
                    console.log("The winner is: ", playerObj.name);
                }
                else if(Gameboard.winRoundChecker(playerObj) == 0){
                    console.log("Its a Draw");
                }


                else{
                    console.log("This spot is taken");
                }
             
                }             
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


    return {renderGameboardArr, markSpot}

})();









displayLogic.renderGameboardArr(Gameboard.gameBoardArr);

displayLogic.markSpot(playersLs.player1, Gameboard.gameBoardArr);

//Gameboard.gameFlow(playersLs, Gameboard.gameBoardArr);


/*
displayLogic = {
renderGameboardArr(arr) =>Check

spotTaken() CHECK
markSpot() CHECK
}


*/