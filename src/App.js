import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

import {winningMoves,emptyCells,checkWin,bestSpot,randomSpot,minimax} from './components/aiModule';


class App extends Component {

    constructor(){
        super();

        this.setWinner = this.setWinner.bind(this)

        this.state = {
            aiPlayer: 'O',
            huPlayer: 'X',
            endingText: 'Try to Best Mr. Unbeatable!',
            winner: undefined
        };
        this.gamestate = {
            board: Array.from(Array(9).keys()),
            totalMoves: 0,
            player: this.state.huPlayer,
            gameLocked: false,
            gameOver: false,
        };
    }


    clicked(cell){
        // If game is locked, return
        if (this.gamestate.gameLocked || this.gamestate.gameOver) return;
        // Only do anything if no player has already occupied the cell
        if (typeof this.gamestate.board[cell.dataset.cell] === 'number'){
            // create 'gamestate' state so we can update it immediately and not cause a re-render
            this.gamestate.board[cell.dataset.cell] = this.gamestate.player;
            cell.innerText = this.gamestate.player;
            // update the moves, whoever generates a 'click' and change the player accordingly
            this.gamestate.player = this.gamestate.player === this.state.huPlayer ? this.state.aiPlayer : this.state.huPlayer;
            this.gamestate.totalMoves++;

            // if huPlayer is winner
            if (this.checkWinner() === this.state.huPlayer){
                this.setWinner(this.state.huPlayer, 'Human Player Wins!')
            }
            // if aiPlayer is winner
            else if (this.checkWinner() === this.state.aiPlayer){
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

    setWinner(winner, endingText){
        this.setState({
            winner: winner,
            endingText: endingText
        })
        this.gamestate.gameOver = true;
    }


    // this function is used by this.gamestate
    // not for use by minimax
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
        console.log("dumbAi--RandCell: ",randCell)

        this.clicked(document.querySelectorAll('.cell')[randCell])
    }


    // call minimax algorithm
    smartAi(){
        let bestCell = bestSpot(this.gamestate.board, this.state.aiPlayer);
        console.log("AI Returns the best spot: ", bestCell)

        // gonna have to return a click event eventually
        this.clicked(document.querySelectorAll('.cell')[bestCell])
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
               checkWin={checkWin}
               smartAi={this.smartAi} bestSpot={bestSpot}
               dumbAi={this.dumbAi}
               minimax={minimax}
               emptyCells={emptyCells}
               resetGame={this.resetGame}
               setWinner={this.setWinner}
        />

      </div>
    );
  }
}

export default App;

