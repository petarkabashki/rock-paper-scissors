module.exports = function() {
    this.Then(/^I can play Player v Computer$/, function () {
        browser.click("button#btnHumVsComp")
        browser.pause(1000)
        browser.waitForExist("//div[contains(@class, 'human')]/button[.='SCISSORS']")
        browser.click("//div[contains(@class, 'human')]/button[.='SCISSORS']")
        browser.pause(2000)
    });
};
