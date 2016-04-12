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