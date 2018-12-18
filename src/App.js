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
            board: Array(9).fill('')
        }

    }


    clicked(ev){
        if (this.state.board[ev.target.dataset.cell] === ''){
        
            this.state.board[ev.target.dataset.cell] = this.state.player;
            ev.target.innerText = this.state.player;
            this.setState({
                player: this.state.player === this.state.huPlayer ? this.state.aiPlayer : this.state.huPlayer,
                board: this.state.board
            })
            console.log("board: ",this.state.board)
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
            <div className="text"></div>
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

