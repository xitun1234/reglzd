const { writeFile, readFile } = require("fs");
const path = "./output.json";
const fs = require("fs");
const { writeFileSync } = require('fs');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

async function RandomApi() {
  const dataFirstname = fs
    .readFileSync("./Lastname.txt", "utf-8")
    .toString()
    .split("\r\n");

  let indexDinhDangFirstname = Math.floor(Math.random() * dataFirstname.length);

  const dataObject = [];

  for (var i = 0; i < dataFirstname.length; i++) {
    const obj = { lastname: dataFirstname[i] };
    //const myJSON = JSON.stringify(obj);
    dataObject.push(obj);
  }

  await fs.writeFileSync('./lastname.json', JSON.stringify(dataObject));
}

async function testRandom(){
    const fileData = await readFilePro('./firstname.json');
    const dataJson = JSON.parse(fileData);
    
    let randomIndex = Math.floor(Math.random() * dataJson.length);
    console.log(dataJson[randomIndex]);
    
}

RandomApi();