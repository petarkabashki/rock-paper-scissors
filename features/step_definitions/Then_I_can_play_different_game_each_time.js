module.exports = function() {
    this.Then(/^I can play different game each time$/, function () {
        browser.waitForExist("button#btnHumVsComp")
        browser.waitForExist("button#btnCompVsComp")
        browser.pause(1000)
    });
};
