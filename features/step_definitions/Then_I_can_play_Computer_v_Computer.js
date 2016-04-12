module.exports = function() {
    this.Then(/^I can play Computer v Computer$/, function () {
        browser.waitForExist("button#btnHumVsComp")
        browser.waitForExist("button#btnCompVsComp")
        browser.click("button#btnCompVsComp")
        browser.pause(1000)
    });
};
