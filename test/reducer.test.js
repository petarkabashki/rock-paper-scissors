const expect = require("expect")
const reducers = require("../app/reducers.js")

describe("Reducer tests", () => {

    describe("mainReducer", () => {

        it("should return cloned state on null action", ()=> {

            const state = {somename: "some stuff "}
            const newState = reducers.mainReducer(state, null, null)

            expect(state).toNotBe(newState)
            expect(state).toEqual(newState)
        })

        it("should start a new game", () => {
            const state = {gameState: "PENDING"}
            const action = {"TYPE":"START GAME","player1":{"name":"HUMAN"},"player2":{"name":"COMPUTER"}};
            const newState = reducers.mainReducer(state, action, null)

            expect(state).toNotBe(newState)
            expect(newState.gameState).toEqual("GAME RUNNING")

            //reducer should clone stuff to new state rather than assign
            expect(newState.player1).toNotBe(action.player1)
            expect(newState.player1).toEqual(action.player1)

            expect(newState.player2).toNotBe(action.player2)
            expect(newState.player2).toEqual(action.player2)
        })


    })

})