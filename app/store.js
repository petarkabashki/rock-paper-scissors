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