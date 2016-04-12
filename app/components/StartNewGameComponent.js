"use strict"

module.exports = class StartNewGameComponent {
    render(parent, state, dispatch){
        const html = `<div class="game pending">
            <h3>Start new game</h3>
            <button id="btnHumVsComp">Play HUMAN v COMPUTER</button>
            <button id="btnCompVsComp">Play COMPUTER v COMPUTER</button>
        </div>`

        const element = document.createElement("div")
        element.innerHTML = html

        element.addEventListener("click", function(event) {
            if(event.srcElement.id === "btnHumVsComp") {
                dispatch({TYPE: "START GAME", player1: { name: "HUMAN"}, player2: { name: "COMPUTER"}})
            } else if(event.srcElement.id === "btnCompVsComp") {
                dispatch({TYPE: "START GAME", player1: { name: "COMPUTER1"}, player2: { name: "COMPUTER2"}})
            }
        });

//TODO: event listener clean up is needed to prevent memory leaks

        parent.appendChild(element)

    }
}