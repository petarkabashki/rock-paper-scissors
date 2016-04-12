"use strict"

const StartNewGameComponent = require("./StartNewGameComponent")
const GameTourComponent = require("./GameTourComponent")

module.exports = class MainComponent {
    render(parent, state, dispatch){
        const html = `
            <div class="header">
                <h2>Rock Paper Scissors</h2>
            </div>
        `

        const element = document.createElement("div")
        element.innerHTML = html

        switch (state.gameState) {
            case "PENDING":
                new StartNewGameComponent().render(element, state.gameState, dispatch)
                break;
            case "GAME RUNNING":
            case "GAME TIED":
            case "GAME OVER":
                new GameTourComponent().render(element, state, dispatch)
            default:
                break
        }

        parent.innerHTML = ""
        parent.appendChild(element)

    }
}