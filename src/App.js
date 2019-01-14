import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

import {winningMoves,emptyCells,checkWin,bestSpot,randomSpot,minimax} from './components/aiModule';


class App extends Component {

    constructor(){
        super();

        this.setWinner = this.setWinner.bind(this)
        this.chooseMarker = this.chooseMarker.bind(this)

        this.state = {
            aiPlayer: null,
            huPlayer: null,
            feedback: 'Try to Best Mr. Unbeatable!',
            winner: undefined
        };
        this.gamestate = {
            board: Array.from(Array(9).keys()),
            totalMoves: 0,
            player: undefined,
            gameOver: false,
        };
    }


    clicked(cell){
        if (this.gamestate.gameOver) return;
        
        if (typeof this.gamestate.board[cell.dataset.cell] === 'number'){

            //if (this.gamestate.player === null) this.gamestate.player = this.state.huPlayer;
            console.log("clicked - huPlayer: ",this.state.huPlayer)
            console.log("clicked - aiPlayer: ",this.state.aiPlayer)
            console.log("Gamestate Player: ",this.gamestate.player)
            

            this.gamestate.board[cell.dataset.cell] = this.gamestate.player;
            cell.innerText = this.gamestate.player;

            
            // change players...
            this.gamestate.player = this.gamestate.player === this.state.huPlayer ? this.state.aiPlayer : this.state.huPlayer;
            this.gamestate.totalMoves++;

            if ((this.state.huPlayer) && (this.checkWinner() === this.state.huPlayer)){
                console.log("checkWinner, huPlayer: ",this.state.huPlayer)
                this.setWinner(this.state.huPlayer, 'Human Player Wins!')
            }
            else if ((this.state.aiPlayer) && (this.checkWinner() === this.state.aiPlayer)){
                this.setWinner(this.state.aiPlayer, 'AI Player Wins!')
            }
            else if (this.checkWinner() === 'draw'){
                this.setWinner('Draw', "Game is a draw! (That's actually the best possible outcome!)")
            }
            // Here is where we call the AI Function for the aiPlayer
            if (this.gamestate.player === this.state.aiPlayer && !this.gamestate.gameOver){
               
               //this.dumbAi(this.gamestate.board);
               this.smartAi();
            }
        }
    }

    setWinner(winner, feedback){
        this.setState({
            winner: winner,
            feedback: feedback,
        })
        this.gamestate.gameOver = true;
    }

    // not used by minimax
    checkWinner(){
        let moves = winningMoves;
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


    // create a dumbAI before to test calling clicked()
    dumbAi(){
        let randCell = randomSpot(this.gamestate.board)
        this.clicked(document.querySelectorAll('.cell')[randCell])
    }


    // call minimax algorithm
    smartAi(){
        let bestCell = bestSpot(this.gamestate.board, this.state.aiPlayer);
        console.log("AI Returns the best spot: ", bestCell)

        // gonna have to return a click event eventually
        this.clicked(document.querySelectorAll('.cell')[bestCell])
    }

    chooseMarker(huMarker, aiMarker){

        this.setState({
           aiPlayer: aiMarker,
           huPlayer: huMarker
        });

        if (huMarker === 'X') this.gamestate.player = huMarker;
        if (aiMarker === 'X') {
            this.gamestate.player = aiMarker;
            this.smartAi();
        }
    }

    resetGame(ev){
        window.location.reload();
    }


  render() {

    return (
      <div className="App">

        <Board 
               clicked={this.clicked}  state={this.state} 
               gamestate={this.gamestate} winningMoves={this.winningMoves} 
               feedback={this.state.feedback} 
               checkWinner={this.checkWinner}
               checkWin={checkWin}
               smartAi={this.smartAi} bestSpot={bestSpot}
               dumbAi={this.dumbAi}
               minimax={minimax}
               emptyCells={emptyCells}
               chooseMarker={this.chooseMarker}
               resetGame={this.resetGame}
               setWinner={this.setWinner}
        />

      </div>
    );
  }
}

export default App;

