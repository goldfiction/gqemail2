/**
 * Created by happy on 3/26/17.
 */
var _subject = " ";
var _cc = "";
var _to = "";
var _from = null;
var SMTPClient = null;
var delayTime = 10;
var that = this;
_from = require(process.cwd() + '/user.js')
_from = _from._from


async function useESModule(done) {
    SMTPClient = await import('emailjs')
    SMTPClient = SMTPClient.SMTPClient
    done()
}

function setServer(fromIn) {
    for (var i in fromIn) {
        _from[i] = fromIn[i]
    }
    return _from
}

function emailit(o, cb1) {
    useESModule(function () {
        //console.log(SMTPClient)
        try {
            var msg = {
                text: (o.text || " "),
                from: (_from.user || "notify <notify553@gmail.com>"),// please leave this mailer account alone
                to: (o.to || _to),
                cc: (o.cc || _cc || ""),
                subject: (o.subject || _subject || "")
            };

            if (o.file) {
                msg.attachment = msg.attachment || [];
                msg.attachment.push(
                    { path: process.cwd() + "/" + o.file, type: "application/zip", name: o.file }
                )
            }

            if (o.html) {
                msg.attachment = msg.attachment || [];
                msg.attachment.push(
                    { data: o.html, alternative: true }
                )
            }

            //console.log(msg);

            var server = new SMTPClient(_from);

            setTimeout(function () {
                server.send(msg, function (err, message) {
                    try {
                        cb1(err, message);
                    } catch (e) {
                    }
                });
            }, delayTime);
        } catch (e) { console.log(e) }
    })

}

exports._emailit = emailit
exports._setServer = setServer

