"use strict"


var exports = module.exports = {}

exports.mainReducer = mainReducer

function mainReducer(state, action, dispatch) {
    if (!action) {
        return Object.assign({}, state);
    }

    switch (action.TYPE) {
        case "START GAME":
            return Object.assign({}, state, {
                gameState: "GAME RUNNING",
                player1: Object.assign({}, action.player1),
                player2: Object.assign({}, action.player2)
            });
            break;
        case "CHOICE MADE":
            return playerMadeChoiceReducer(state, action, dispatch)
            break;
        case "BOTH CHOSEN":
            return bothPlayersChosenReducer(state, action, dispatch)
            break;
        case "GAME TIED":
            return Object.assign({}, state, {
                gameState: "GAME TIED",
                player1: Object.assign({}, state.player1, {choice: undefined}),
                player2: Object.assign({}, state.player2, {choice: undefined})
            });
            break;
        case "GAME OVER":
            return Object.assign({}, state, {gameState: "GAME OVER", winner: action.winner});
            break;
        default:
            return state
    }
}

exports.playerMadeChoiceReducer = playerMadeChoiceReducer

function playerMadeChoiceReducer(state, action, dispatch){
    const player = Object.assign({}, state[action.playerPosition], {choice: action.choice})
    var newState = Object.assign({}, state)
    newState[action.playerPosition] = player

    if(newState.player1.choice !== undefined && newState.player2.choice !== undefined){
        setTimeout(() => {dispatch({TYPE: "BOTH CHOSEN"})})
    }
    return newState
}

exports.bothPlayersChosenReducer = bothPlayersChosenReducer

function bothPlayersChosenReducer(state, action, dispatch){
    var player1Wins, tied, winner
    if(state.player1.choice === state.player2.choice) {
        tied = true
        setTimeout(()=>{dispatch({TYPE: "GAME TIED" })})
        return state
    } else {
        switch (state.player1.choice){
            case "ROCK":
                player1Wins = state.player2.choice === "SCISSORS"
                break
            case "PAPER":
                player1Wins = state.player2.choice === "ROCK"
                break
            default :
                player1Wins = state.player2.choice === "PAPER"
                break
        }
        winner = player1Wins ? state.player1.name : state.player2.name
        setTimeout(()=>{dispatch({TYPE: "GAME OVER", winner: winner })})

        return state
    }
}