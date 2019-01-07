// This entire module will be imported as 'ai' even though it includes
// some functionality that isn't specificially for the minimax AI...



export const winningMoves = [
         [0,1,2],[3,4,5],[6,7,8],
         [0,3,6],[1,4,7],[2,5,8],
         [0,4,8],[2,4,6]
];


// This gets called a lot from minimax
export function emptyCells(board){
    return board.filter((element,i) => i===element);
}


// this will be used by minimax() and must not affect state
export function checkWin(board, player) {
  let winCombos = winningMoves;
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
	if (win.every(elem => plays.indexOf(elem) > -1)) {
	  gameWon = {index: index, player: player};
	  break;
	}   
  }
  return gameWon;
}
    

// this function must now be called with parameters because gamestate 
// does not exist in this function
export function bestSpot(board,aiPlayer){
    //return this.minimax(this.gamestate.board, this.state.aiPlayer).index;
    return minimax(board, aiPlayer).index;
}


// this function now requires a board to work with
export function randomSpot(board){
    //let available = this.emptyCells(this.gamestate.board);
    let available = emptyCells(board);
    let randCell = available[Math.floor(Math.random()*available.length)];
    return randCell;
}


export function minimax(newBoard, player){
    let huPlayer = "X";
    let aiPlayer = "O";

    let availSpots = emptyCells(newBoard);

    // Task 1:  check for ending state
	if (checkWin(newBoard, huPlayer)) {
	  return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
	  return {score: 10};
	} else if (availSpots.length === 0) {
	  return {score: 0};
	}

    // Task 2:  collect scored moves/indexes for remaining empty cells
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
	  
        let move = {};
	    move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

	    if (player === aiPlayer){
		  move.score = minimax(newBoard, huPlayer).score;
        }else{
		  move.score =  minimax(newBoard, aiPlayer).score;

        }

	    newBoard[availSpots[i]] = move.index;
	    if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
		  return move;
        else
		  moves.push(move);
	}


    // Task 3: find best move index/score from moves object
    //         -- this will depend on which player the AI is playing as
	let bestMove, bestScore;
	if (player === aiPlayer) {
	    bestScore = -1000;
	    for(let i = 0; i < moves.length; i++) {
	        if (moves[i].score > bestScore) {
			    bestScore = moves[i].score;
			    bestMove = i;
		    }
		}
    } else {
        bestScore = 1000;
	    for(let i = 0; i < moves.length; i++) {
		    if (moves[i].score < bestScore) {
			    bestScore = moves[i].score;
			    bestMove = i;
		    }
		}
	}

    // Task 4: Actually return the best possible move found in Task 3
    return moves[bestMove];
}


