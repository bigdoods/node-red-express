const { visitMails } = require("./mailVisitor");
const { mailToPdf } = require("./renderer");

function getAllMailIds(thread) {
    const mailIds = [];
    visitMails(thread, ({ MailId, MailAttachment }) => {
        mailIds.push(MailId);

        if(MailAttachment) {
            MailAttachment.forEach(({MailId}) => mailIds.push(MailId))
        }
    });

    return mailIds;
}

function getAllMails(thread) {
    const mails = [];

    visitMails(thread, (m, depth) => {
        var mail = Object.assign({depth}, m);
        mails.push(mail)
    });

    return mails;
}

async function renderThreadToPDF(thread, outputPath) {
    return await mailToPdf(getAllMails(thread), outputPath);
}

module.exports = {
    getAllMailIds,
    renderThreadToPDF
}
