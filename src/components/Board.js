// This used to be a class component
//import React, { Component } from 'react';
import React from 'react';
import '../App.css';

export default function Board(props) {
    
    console.log("Props: ",props);

    return (
      <div className="App">

      <h1>Unbeatable Tic Tac Toe AI</h1>

        <div className="board" onClick={(ev)=>props.clicked(ev.target)}>
                <div className="cell empty-top empty-left" id="0" data-cell="0"></div>
                <div className="cell empty-top"            id="1" data-cell="1"></div>
                <div className="cell empty-top empty-right" id="2" data-cell="2"></div>
                <div className="cell empty-left"           id="3" data-cell="3"></div>
                <div className="cell "                     id="4" data-cell="4"></div>
                <div className="cell empty-right"          id="5" data-cell="5"></div>
                <div className="cell empty-bottom empty-left" id="6" data-cell="6"></div>
                <div className="cell empty-bottom"         id="7" data-cell="7"></div>
                <div className="cell empty-bottom empty-right" id="8" data-cell="8"></div>
        </div>


        <div className="endgame">
            <div>{props.endingText}</div>
        </div>


             <button className="restart" onClick={(ev)=>props.resetGame(ev)} >Replay</button>       

      </div>
    );
}


