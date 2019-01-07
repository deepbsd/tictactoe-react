export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
    type: NEW_GAME,
    aiPlayer: 'O',
    huPlayer: 'X',
    endingText: 'Try to Best Mr. Unbeatable!',
    winner: undefined
});

export const MAKE_CLICK = 'MAKE_CLICK';
export const makeClick = click => ({
    type: MAKE_CLICK,
    click
});

