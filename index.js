const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { options } = config;

async function executeTest(){

    let datetime = new Date().toISOString().replace(/:/g,".");
    let resultInfo = {};
     
    const data = await compareImages(
        fs.readFileSync(`./cypress/screenshots/generate.spec.js/1.png`),
        fs.readFileSync(`./cypress/screenshots/generate.spec.js/2.png`),
        options
    );
     resultInfo = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
    }
    fs.writeFileSync(`./cypress/screenshots/generate.spec.js/compare.png`, data.getBuffer());

fs.writeFileSync(`./cypress/screenshots/generate.spec.js/report.html`, createReport(datetime, resultInfo));
fs.copyFileSync('./index.css', `./cypress/screenshots/generate.spec.js/index.css`);

console.log('------------------------------------------------------------------------------------')
console.log("Execution finished. Check the report under the results folder")
return resultInfo;  
}

(async ()=>console.log(await executeTest()))();

function test(info){
    return `<div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="./1.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="./2.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${test(resInfo)}
            </div>
        </body>
    </html>`
}