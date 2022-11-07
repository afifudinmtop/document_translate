# document_translate

translate document(.docx) using web scrap google translate

## Installation

```
npm i document_translate
```

## Demo

Local demo:

```
git clone https://github.com/afifudinmtop/document_translate.git
cd document_translate
npm install && node test.js

// it will log the translated text and write it on .txt file
// please change the variable of file, source_language, target_language
```

## Examples

```jsx
const app = require("document_translate");
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
```

// it will log the translated text and write it on .txt file
// please change the variable of file, source_language, target_language
// you can see the example files on test.js

## License

document_translate is open source software [licensed as MIT](https://github.com/afifudinmtop/document_translate/blob/main/LICENSE).
