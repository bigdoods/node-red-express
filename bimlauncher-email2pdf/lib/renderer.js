const Mustache = require('mustache');
const fs = require("fs");
const sanitizeHtml = require('sanitize-html')
const pdf = require('html-pdf')
const dateFormat = require('dateformat')

function mailToModel(mail) {
    const messages = mail.map((m, index) => {
            const view = Object.assign({}, m);
            view.HasMailAttachment = !!mail.MailAttachment;
            view.index = index;
            view.SentDate = dateFormat(m.SentDate, "mm/dd/yyyy")
            view.SanitizedData = sanitizeHtml(m.MailData, { allowedAttributes: { '*' : [ 'style' ]}});

            return view;
            })

    return { 
        messages,
            repeatForDepth: () => (text, render) => {
                const currentDepth = parseInt(render("{{ depth }}"));
                return Array(currentDepth).fill(0).map(() => render(text)).join("");
            }
    };
}

async function mailToHtml(mail) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/template.mustache", (err, contents) => {
            if(err) {
                return reject(err);
            }

                resolve(Mustache.render(contents.toString(), mailToModel(mail)));
        })
    })
}

async function mailToPdf(mail, outputFilePath = "/tmp/test.pdf") {
    const html = await mailToHtml(mail);

    return new Promise((resolve, reject) => {
        pdf.create(html, { 
                format: 'A4', 
                footer: {
                    height: "20px"
                },
                header: {
                    height: "20px"
                },
                renderDelay: 100
            }).toFile(outputFilePath, (err, res) => {
            if(err) {
                return reject(err);
            }
            resolve(res);
        });
    });
}


module.exports = { 
    mailToHtml,
    mailToPdf,
    mailToModel
}
