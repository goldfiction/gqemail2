/**
 * Created by happy on 3/26/17.
 */
var emailit = require('../main.js')._emailit
var setServer = require('../main.js')._setServer
var _from = require('../user.js')._from

setServer(_from)

it("should be able to send email with attachment", function (done) {
    emailit({ to: "glidev5@gmail.com", file: "test/test.zip" }, done);
});

it("should be able to send html email", function (done) {
    emailit({ to: "glidev5@gmail.com", html: "click <a href='http://google.com'>here</a> to go to google" }, done)
});

it("should be able to set server setting", function (done) {
    setServer({ port: 433 });
    done()
})