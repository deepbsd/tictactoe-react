# React Tic Tac Toe

This project is an extension of my tic tac toe app in vanilla js.  The idea is to 
use the MiniMax algorithm to create an unbeatable AI to play against.

With react, the actual point of playing is to see how the machine decides where
to move.  The best you can do is have a Tie against this AI.  The real payoff
is seeing how an AI thinks!


4 Jan 2019

Minimax is running from the Board component and state is being passed down and 
manipulated on the parent from the child component, however, the answer being
returned from Minimax is simply wrong.

The performance hit seems to be minimal now that I've removed many of the console.logs.
