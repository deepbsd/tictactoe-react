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

5 Jan 2019

Finally!  The app is basically working.  The correct answer is being returned by Minimax!
The problem was that this.state.aiPlayer was set to zero rather than capital 'O'!!!!
It only took me about three weeks to find that error!!!!!

Now I was going to refactor this a bit more so it behaves more like a real React App!

9 Jan 2019

I'm trying to figure out how to isolate the gamestate from the app state.  If I tie app 
state to gamestate, then that drives too many re-renders of the app and makes a mess.
If I keep gamestate (the board) separate from the app state, the app continues working
as it does now, but then what's the advantage of moving state out of the App component
at all?  Doesn't seem like there's an improvement with using Redux at all?

9 Jan 2019

At this point I don't see the advantage to using Redux on this app.  If my opinion 
changes at some point in the future, I'll happily add an action creator and reducer.
I think for the time being, though, I'll remove those directories and simply keep
the app state inside the App component...

14 Jan 2019

Took some time off.  Working now on adding marker choice to game (player gets to choose
his/her marker).  Had a rejected push after adding some functionality.  Did a +master
so a forced push.  Should be fine.  Not sure who else would be pushing to the repo; I'm
pretty sure I'm the only one committing to it!  Maybe an internal change at github?
Anyway, Hope I didn't lose anything...

14 Jan 2019

Hit a wall with setState being too slow.  Tried to put it into a Promise, but that
didn't work out.  I just changed the game back to the way it was before I started
today.
