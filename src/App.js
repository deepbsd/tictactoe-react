import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            aiPlayer: '0',
            huPlayer: 'X',
            endingText: null,
            winner: undefined
        };
        this.gamestate = {
            board: Array(9).fill(''),
            totalMoves: 0,
            player: 'X',
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
        if (this.gamestate.gameLocked || this.gamestate.gameOver) return ;

        // Only do anything if no player has already occupied the cell
        if (this.gamestate.board[cell.dataset.cell] === ''){
        
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
                this.setState({
                    winner: this.state.huPlayer,
                    endingText: 'Human Player Wins!'
                })
                this.gamestate.gameOver = true;
            }
            // AI player
            else if (result === this.state.aiPlayer){
                this.setState({
                    winner: this.state.aiPlayer,
                    endingText: 'AI Player wins!'
                })
                this.gamestate.gameOver = true;
            }
            // tie game
            else if (result === 'draw'){
                this.setState({
                    winner: 'Draw',
                    endingText: "Game is a draw!  (That's actually the best possible!)"
                })
                this.gamestate.gameOver = true;
            }
        
            // Here is where we call the AI Function for the aiPlayer
            if (this.gamestate.player === this.state.aiPlayer && !this.gamestate.gameOver){
               //this.dumbAi();
               this.smartAi();
            }

            // Do some checking on state...
            console.log("Player: ", this.gamestate.player)
            console.log("emptyCells",this.emptyCells())
            console.log("board: ",this.gamestate.board)
            console.log("winner: ",this.checkWinner())
            console.log("checkTie", this.checkTie())
            console.log("gameOver: ",this.gamestate.gameOver)
            console.log("endingText",this.state.endingText)
            console.log("totalMoves",this.gamestate.totalMoves)
            console.log("checkWin()",this.checkWin(["X","X","X",3,4,5,6,7,8],"X"))
        }
            
    }

    emptyCells(board=this.gamestate.board){
        let emptyArr = {};
        //for (let i=0; i<this.gamestate.board.length; i++){
        for (let i=0; i<board.length; i++){
            //if (this.gamestate.board[i] === '') emptyArr[i] = this.gamestate.board[i];
            if (board[i] === '') emptyArr[i] = board[i];
        }
        return Object.keys(emptyArr).map(function(item){
            return parseInt(item, 10)
        });
    }

    // return true or false
    checkTie(){
        return this.checkWinner() === 'draw';
    }

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
        let available = this.emptyCells();
        let randIndex = available[Math.floor(Math.random()*available.length)];
        this.clicked(document.querySelectorAll('.cell')[randIndex])
    }


    // begin to use minimax algorithm
    // I will need some more functions...
    smartAi(){
        let bestSpot = this.minimax(this.gamestate.board, this.state.player);
        console.log("smart AI called! bestSpot = ",bestSpot);

        // gonna have to return a click event eventually
        //this.clicked(document.querySelectorAll('.cell')[bestSpot])
    }

    minimax(newBoard, player){
        //console.log("this.state: ",this.state)
        let huPlayer = "X";
        let aiPlayer = "O";
        // Wait! has to be empty cells just for this newBoard...
        let availSpots = this.emptyCells(newBoard);

  
		if (this.checkWin(newBoard, huPlayer)) {
		  return {score: -10};
		} else if (this.checkWin(newBoard, aiPlayer)) {
		  return {score: 10};
		} else if (availSpots.length === 0) {
		  return {score: 0};
		}

        // second part of minimax
		var moves = [];
		for (let i = 0; i < availSpots.length; i++) {
		    var move = {};

		    move.index = newBoard[availSpots[i]];

		    newBoard[availSpots[i]] = player;

            // DEBUGGING
            if (player === 'undefined') console.log("UNDEFINED: ",player)
            console.log("INDEX A NUMBER???: ", move.index)
            console.log("MOVE",move)
            console.log("BOARD: ",newBoard)
            console.log("AVAIL SPOTS[i]: ",availSpots[i])
            console.log("AVAILSPOTS: ",availSpots)
            console.log("PLAYER: ",player)

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
        // what are we getting here?
        console.log("MOVES: ",moves)

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


        console.log("minimax MovesObj: ",moves[bestMove])

        // return the best move
        return moves[bestMove];
    }


  render() {
    return (
      <div className="App">

      <h1>Unbeatable Tic Tac Toe AI</h1>

        <div className="board" onClick={(ev)=>this.clicked(ev.target)}>
                <div className="cell empty-top empty-left" id="0" data-cell="0"></div>
                <div className="cell empty-top"            id="1" data-cell="1"></div>
                <div className="cell empty-top empty-right" id="2" data-cell="2"></div>
                <div className="cell empty-left"           id="3" data-cell="3"></div>
                <div className="cell " id="4"                     data-cell="4"></div>
                <div className="cell empty-right" id="5"          data-cell="5"></div>
                <div className="cell empty-bottom empty-left" id="6" data-cell="6"></div>
                <div className="cell empty-bottom" id="7"         data-cell="7"></div>
                <div className="cell empty-bottom empty-right" id="8" data-cell="8"></div>
        </div>


        <div className="endgame">
            <div>{this.state.endingText}</div>
        </div>



        {/*     <div className = "selectSym">
                <p>Your Symbol?</p>
                  <button onClick="selectSym('X')">X</button>
                  <button onClick="selectSym('O')">O</button>
                </div>
                <button onClick="startGame()" className="restart">Replay</button>       */}

      </div>
    );
  }
}

export default App;

