"use strict"

const Store = require("./store");
const Renderer = require("./renderer")

const store = new Store()
const renderer = new Renderer(document.getElementById("main"), store.dispatch)

store.subscribe(renderer)
store.dispatch()
