const puppeteer = require("puppeteer");
const mammoth = require("mammoth");

async function translate(file, source_language, target_language) {
  // extract text
  const text_original = await (
    await mammoth.extractRawText({ path: file })
  ).value;

  // split into multiple part each 4000 character
  let text_array = splitter(text_original, 4000);
  let final_result = "";

  // setup
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
  );

  // looping translate
  for (let index = 0; index < text_array.length; index++) {
    let src = text_array[index];
    // redirect
    await page.goto(
      "https://translate.google.com/?sl=" +
        source_language +
        "&tl=" +
        target_language +
        "&op=translate",
      {
        waitUntil: "networkidle2",
      }
    );

    // type
    await page.focus("textarea");
    await page.$eval(
      "textarea",
      (el, src) => {
        el.value = src;
      },
      src
    );

    await page.focus("textarea");
    await page.keyboard.type(" ");
    await delay(3000);

    // begin to append

    let xx = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".HwtZe"), (x) =>
        x.innerText.trim()
      );
    });

    final_result += xx[0];
  }

  // close browser
  await browser.close();
  return final_result;
}

// split paragraph
function splitter(str, l) {
  var strs = [];
  while (str.length > l) {
    var pos = str.substring(0, l).lastIndexOf(" ");
    pos = pos <= 0 ? l : pos;
    strs.push(str.substring(0, pos));
    var i = str.indexOf(" ", pos) + 1;
    if (i < pos || i > pos + l) i = pos;
    str = str.substring(i);
  }
  strs.push(str);
  return strs;
}

// wait
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

module.exports = { translate };
