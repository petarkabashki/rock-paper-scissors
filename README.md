# rock-paper-scissors

The solution contains uni-directional dataflow implementation with a custom store, reducers and components.
It is inspired by React/Redux, but is completely hand-written.

All data and event actions are dispatched to a single store that contains the application state.
A "renderer" creates all the UI from the application state using nested components that pass the state down
the hierarchy.

Browserify is used as module bundler that outputs a single file in "build/bundle.js"
Mocha and Expect are used for unit testing
Chimp / Cucumber.js / WebdriverIO are used for BDD tests

Unit tests are in "test" folder
BDD feature files and step definitions are in "features" folder

Prerequisites:

npm install
npm install browserify -g
npm install -g chimp
npm install http-server -g


To build the app:
npm run build

To run the unit tests:
npm run unit:tests

To run the BDD tests first start a webserver via:
npm run start:server

Then in another terminal run the bdd tests via:
npm run bdd:test


To run the game open index.html in the browser
