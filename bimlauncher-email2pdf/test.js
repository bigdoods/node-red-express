const { renderThreadToPDF, getAllMailIds } = require(".");
var t = require("./data.json");

(async () =>  {
    console.log(await renderThreadToPDF(t, "/tmp/test2.pdf"))
    console.log(getAllMailIds(t));
})()

