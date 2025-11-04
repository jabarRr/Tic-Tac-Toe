/*
gameboardObj = {
    players: Check
    grid: Check
    playerTurn(): Check
    winRound(): 
    winGame();
}
*/



function players(playerX, playerO) {

    function createPlayer(name, symbol) {
        return { name, symbol };
    }

    const player1 = createPlayer(playerX, "X");
    const player2 = createPlayer(playerO, "O");
    return { player1, player2 };
}


const Gameboard = (function(){
    const winningPos = [
        [3, 6, 9], [2, 5, 8], [1, 4, 7],
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 5, 9], [3, 5, 9],
    ]
    const gameBoardArr = ["BlANK", "BLANK", "BLANK", "BlANK", "BLANK", "BLANK", "BlANK", "BLANK", "BLANK"];

    function winRoundChecker(){
        for (let i = 0; i < winningPos.length; i++){
            const currentCombination = winningPos[i];

            for (let n = 0; n < currentCombination.length; n++){
                
                

            }

        }
    }


    function playerTurn(playerObj, position){
         position--;
         gameBoardArr[position] = playerObj.symbol;
         console.log(gameBoardArr);
    }



    
    return  {playerTurn , gameBoardArr};

})();

console.log("GameBoard Array", Gameboard.gameBoardArr);
let playersLs = players("Jack", "Bill");

console.log("Player 1: " , playersLs.player1);
console.log("Player 2: " , playersLs.player2);

Gameboard.playerTurn(playersLs.player1, 5);