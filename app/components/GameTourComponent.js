"use strict"

const StartNewGameComponent = require("./StartNewGameComponent")
const PlayerComponent = require("./PlayerComponent")

module.exports = class GameTourComponent {
    render(parent, state, dispatch){

        const element = document.createElement("div")
        element.className = "game running"

        switch (state.gameState){
            case "GAME TIED":
                element.innerHTML = `<h3>GAME TIED: ${state.player1.name} V ${state.player2.name} </h3>`
                break
            case "GAME RUNING":
                element.innerHTML = `<h3>PLAYING: ${state.player1.name} against ${state.player2.name} </h3>`
                break
            case "GAME OVER":
                element.innerHTML = `<h3>GAME OVER!</h3>
                    <h3>WINNER IS : ${state.winner}</h3>`
                break
            default:
                break
        }

        const playersElement = document.createElement("div")
        playersElement.className = "game-players"
        element.appendChild(playersElement)

        const showChoice = state.player1.choice !== undefined && state.player2 !== undefined

        new PlayerComponent().render(playersElement, "player1", state.player1, showChoice, dispatch)
        new PlayerComponent().render(playersElement, "player2", state.player2, showChoice, dispatch)

        const clrElement = document.createElement("div")
        clrElement.className = "clearBoth"
        element.appendChild(clrElement)

        parent.appendChild(element)

        if(state.gameState === "GAME OVER"){
            new StartNewGameComponent().render(parent, state.gameState, dispatch)
        }

    }
}