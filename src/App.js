import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            aiPlayer: '0',
            huPlayer: 'X',
            player: 'X',
            gameOver: false,
            endingText: null,
            winner: undefined
        };
        this.gamestate = {
            board: Array(9).fill(''),
            totalMoves: 0
        };

    }


    clicked(ev){
        // Only do anything if no player has already occupied the cell
        if (this.gamestate.board[ev.target.dataset.cell] === ''){
        
            this.gamestate.board[ev.target.dataset.cell] = this.state.player;
            ev.target.innerText = this.state.player;
            this.setState({
                player: this.state.player === this.state.huPlayer ? this.state.aiPlayer : this.state.huPlayer,
            })

            this.gamestate.totalMoves++;

            let result = this.checkWinner();

            if (result === this.state.huPlayer){
                this.setState({
                    gameOver: true,
                    winner: this.state.huPlayer,
                    endingText: 'Human Player Wins!'
                })
            }
            else if (result === this.state.aiPlayer){
                this.setState({
                    gameOver: true,
                    winner: this.state.aiPlayer,
                    endingText: 'AI Player wins!'
                })
            }
            else if (result === 'draw'){
                this.setState({
                    gaveOver: true,
                    winner: 'Draw',
                    endingText: "Game is a draw!  (That's actually the best possible!)"
                })
            }


            console.log("board: ",this.gamestate.board)
            console.log("winner: ",this.state.winner)
            console.log("gameOver: ",this.state.gameOver)
            console.log("endingText",this.state.endingText)
            console.log("totalMoves",this.gamestate.totalMoves)
        }
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

  render() {
    return (
      <div className="App">

      <h1>Unbeatable Tic Tac Toe AI</h1>

        <div className="board" onClick={(ev)=>this.clicked(ev)}>
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



        <div className = "selectSym">
        <p>Your Symbol?</p>
          <button onClick="selectSym('X')">X</button>
          <button onClick="selectSym('O')">O</button>
        </div>
        <button onClick="startGame()" className="restart">Replay</button>


      </div>
    );
  }
}

export default App;
