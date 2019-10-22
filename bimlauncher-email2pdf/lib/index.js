const { visitMails } = require("./mailVisitor");
const { mailToPdf, mailToModel } = require("./renderer");
const htmlPdf = require("./html-pdf-compat/lib/index.js")

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

function getThreadModel(thread) {
    return mailToModel(getAllMails(thread));
}

module.exports = {
    getAllMailIds,
    renderThreadToPDF,
    mailToPdf,
    getThreadModel,
    htmlPdf
}
