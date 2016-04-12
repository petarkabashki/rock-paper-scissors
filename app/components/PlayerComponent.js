"use strict"
module.exports = class PlayerComponent {
    render(parent, playerPosition, player, showChoice, dispatch){
        const choices = ["ROCK", "PAPER", "SCISSORS"]
        function renderButton(playerName, caption){

            return `<button ${playerName !== "HUMAN" || player.choice ? "disabled" : ""} class="${ showChoice && player.choice === caption ? "chosen" : ""}">${caption}</button>`
        }
        const html = `
            <h5>${player.name}${player.choice === undefined ? " IS THINKING HARD ..." : " HAS CHOSEN " + player.choice + " !" }</h5>
            ${renderButton(player.name, "ROCK")}
            ${renderButton(player.name, "PAPER")}
            ${renderButton(player.name, "SCISSORS")}
        `

        const element = document.createElement("div")
        element.className = "player" + " " + player.name.toLowerCase()
        element.innerHTML = html

        if(player.name === "HUMAN") {
            element.addEventListener("click", function (event) {
                if (event.target.nodeName.toLowerCase() === "button") {
                    dispatch({TYPE: "CHOICE MADE", playerPosition: playerPosition, choice: event.target.innerText })
                }
            });
        } else if(player.choice === undefined){
            let selected = choices[Math.floor(Math.random()*3)]
            setTimeout(dispatch({TYPE: "CHOICE MADE", playerPosition: playerPosition, choice: selected }), 500)
        }

        parent.appendChild(element)

    }
}