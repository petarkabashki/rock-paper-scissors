(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict"

const Store = require("./store");
const Renderer = require("./renderer")

const store = new Store()
const renderer = new Renderer(document.getElementById("main"), store.dispatch)

store.subscribe(renderer)
store.dispatch()

},{"./renderer":8,"./store":9}],3:[function(require,module,exports){
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
},{"./PlayerComponent":5,"./StartNewGameComponent":6}],4:[function(require,module,exports){
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
},{"./GameTourComponent":3,"./StartNewGameComponent":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
"use strict"

const MainComponent = require("./components/MainComponent")

module.exports = class Renderer{
    constructor(container, dispatch){
        this._container = container
        this._dispatch = dispatch
    }

    notify(state) {
        this.render(state)
    }

    render(state){
        const mainComponent = new MainComponent()

        mainComponent.render(this._container, state, this._dispatch);
    }
}
},{"./components/MainComponent":4}],9:[function(require,module,exports){
(function (process){
"use strict"

const reducers = require("./reducers")

module.exports = class Store {
    constructor(){
        const subscribers = []
        var state = { gameState: "PENDING" }

        const me = this
        this.dispatch = (action) =>
        {
            if (process.browser) {
                console.log("BEFORE STATE: ", state)
                console.log("ACTION: ", action)
            }

            state = reducers.mainReducer(state, action, function(actn){ me.dispatch(actn) })


            if (process.browser) {
                console.log("AFTER STATE: ", state)
            }

            subscribers.forEach(s => s.notify(state))
        }

        this.subscribe = (subscriber) => {
            subscribers.push(subscriber)
        }

        this.getState = () => {
            return Object.assign({},state)
        }
    }
}
}).call(this,require('_process'))
},{"./reducers":7,"_process":1}]},{},[2]);
