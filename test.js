const app = require("./app.js");
const fs = require("node:fs");

// config
const file = "./tes.docx";
const source_language = "id";
const target_language = "en";

app.translate(file, source_language, target_language).then(function (result) {
  console.log(result);

  // example to write on .txt
  fs.writeFileSync("./result.txt", result);
});
