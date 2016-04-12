const expect = require("expect")
const Store = require("../app/store.js")

describe("Store tests", () => {

    it("should have initial state", () => {

        const store = new Store()
        const state = store.getState()

        expect(state.gameState).toBe("PENDING")
    })


    it("should dispatch actions", () => {

        const store = new Store()
        const action = {}

        store.dispatch(action)
    })
})