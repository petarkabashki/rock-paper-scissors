module.exports = function() {
    this.When(/^I visit the page$/, function () {
        browser.url('http://localhost:3030')
        browser.pause(1000)
    });
};
