import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'

class App extends Component {

    constructor(){
        super();

        this.setWinner = this.setWinner.bind(this)

        this.state = {
            aiPlayer: '0',
            huPlayer: 'X',
            endingText: null,
            winner: undefined
        };
        this.resetState = {
            board: Array.from(Array(9).keys()),
            totalMoves: 0,
            player: 'X',
            gameLocked: false,
            gameOver: false,
        };
        this.gamestate = {
            board: Array.from(Array(9).keys()),
            totalMoves: 0,
            player: this.state.huPlayer,
            gameLocked: false,
            gameOver: false,
        };
        this.winningMoves = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
    }


    clicked(cell){
        // If game is locked, return
        if (this.gamestate.gameLocked || this.gamestate.gameOver) return;
        // If it's a good click, tell us which cell...
        //console.log("CLICKED CELL: ",cell)

        // Only do anything if no player has already occupied the cell
        if (typeof this.gamestate.board[cell.dataset.cell] === 'number'){
        
            // create 'gamestate' state so we can update it immediately and not cause a re-render
            this.gamestate.board[cell.dataset.cell] = this.gamestate.player;
            cell.innerText = this.gamestate.player;

            // update the moves, whoever generates a 'click' and change the player accordingly
            this.gamestate.player = this.gamestate.player === this.state.huPlayer ? this.state.aiPlayer : this.state.huPlayer;
            this.gamestate.totalMoves++;

            // check for game completion and resulting outcome
            let result = this.checkWinner();

            // human player
            if (result === this.state.huPlayer){
                this.setWinner(this.state.huPlayer, 'Human Player Wins!')
                //this.setState({
                //    winner: this.state.huPlayer,
                //    endingText: 'Human Player Wins!'
                //})
                //this.gamestate.gameOver = true;
            }
            // AI player
            else if (result === this.state.aiPlayer){
                this.setWinner(this.state.aiPlayer, 'AI Player Wins!')
                //this.setState({
                //    winner: this.state.aiPlayer,
                //    endingText: 'AI Player wins!'
                //})
                //this.gamestate.gameOver = true;
            }
            // tie game
            else if (result === 'draw'){
                this.setWinner('Draw', "Game is a draw! (That's actually the best possible outcome!)")
                //this.setState({
                //    winner: 'Draw',
                //    endingText: "Game is a draw!  (That's actually the best possible!)"
                //})
                //this.gamestate.gameOver = true;
            }
        
            // Here is where we call the AI Function for the aiPlayer
            if (this.gamestate.player === this.state.aiPlayer && !this.gamestate.gameOver){
               
               //this.dumbAi();
               this.smartAi();
            }

            // Do some checking on state...
            console.log("Player: ", this.gamestate.player)
            console.log("emptyCells",this.emptyCells(this.gamestate.board))
            console.log("board: ",this.gamestate.board)
            console.log("winner: ",this.checkWinner())
            console.log("gameOver: ",this.gamestate.gameOver)
            console.log("endingText",this.state.endingText)
            console.log("totalMoves",this.gamestate.totalMoves)
        }
    }

    setWinner(winner, endingText){
        this.setState({
            winner: winner,
            endingText: endingText
        })
        this.gamestate.gameOver = true;
    }

    // ======= This gets called a lot from minimax
    emptyCells(board){
        return board.filter((element,i) => i===element);
    }

    // this function is used by this.gamestate
    // not for use by minimax
    checkWinner(){
        // create possible winning moves
        let moves = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        
        let board = this.gamestate.board;

        // iterate through each winning combination and check with state.board
        for (let i=0; i<moves.length; i++){
            if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]){
                return board[moves[i][0]];
            } 
        }
        if (this.gamestate.totalMoves >= 9){
            return 'draw'
        }
    }

    // trying out another checkWin() function
    // this will be used by minimax() and must not affect state
    checkWin(board, player) {
      let winCombos = this.winningMoves;
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

    // create a dumbAI before to test calling clicked()
    dumbAi(){
        let available = this.emptyCells(this.gamestate.board);
        let randCell = available[Math.floor(Math.random()*available.length)];

        this.clicked(document.querySelectorAll('.cell')[randCell])
    }


    // begin to use minimax algorithm
    // I will need some more functions...
    smartAi(){
        //let bestSpot = this.minimax(this.gamestate.board, this.gamestate.player).index;
        let bestSpot = this.bestSpot();
        console.log("smart AI called! bestSpot = ",bestSpot);

        // gonna have to return a click event eventually
        this.clicked(document.querySelectorAll('.cell')[bestSpot])
    }

    bestSpot(){
        return this.minimax(this.gamestate.board, this.state.aiPlayer).index;
    }

    minimax(newBoard, player){
        let huPlayer = "X";
        let aiPlayer = "O";

        let availSpots = this.emptyCells(newBoard);
        console.log("AVAIL: ",availSpots)
  
		if (this.checkWin(newBoard, huPlayer)) {
		  return {score: -10};
		} else if (this.checkWin(newBoard, aiPlayer)) {
		  return {score: 10};
		} else if (availSpots.length === 0) {
		  return {score: 0};
		}

        // second part of minimax
		let moves = [];
		for (let i = 0; i < availSpots.length; i++) {
		  
            let move = {};
		    move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

		    if (player === aiPlayer)
			  move.score = this.minimax(newBoard, huPlayer).score;
		    else
			   move.score =  this.minimax(newBoard, aiPlayer).score;

		    newBoard[availSpots[i]] = move.index;
		    if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
			  return move;
            else
			  moves.push(move);
		}


        // third part of minimax
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

        // DEBUGGING
        console.log("__MINIMAX:___")
        console.log("Player: ",player)
        console.log("bestScore: ",bestScore)
        console.log("bestMove: ",bestMove)
        console.log("minimax MovesObj: ",moves[bestMove])

        return moves[bestMove];
    }

    resetGame(ev){
        window.location.reload();
    }


  render() {

    return (
      <div className="App">

        <Board clicked={this.clicked}  state={this.state} 
               gamestate={this.gamestate} winningMoves={this.winningMoves} 
               endingText={this.state.endingText} 
               checkWinner={this.checkWinner}
               checkWin={this.checkWin}
               smartAi={this.smartAi} bestSpot={this.bestSpot}
               dumbAi={this.dumbAi}
               minimax={this.minimax}
               emptyCells={this.emptyCells}
               resetGame={this.resetGame}
               setWinner={this.setWinner}
        />

      </div>
    );
  }
}

export default App;

