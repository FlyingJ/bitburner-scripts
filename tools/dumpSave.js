const buffer = require('buffer');
const fs = require('fs');
const path = require('path');

const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);

console.log(`Input: ${input}`);
console.log(`Output: ${output}`);

main(input).then(() => {
  console.log('Done!');
});

async function main(input) {
  let fileContent = fs.readFileSync(input, 'utf8');
  let buffyr = buffer.Buffer.from(fileContent, 'base64');
  let saveContent = buffyr.toString();

  fs.writeFileSync(output, saveContent);
  return;

  // let saveObject = JSON.parse(saveContent);

  // console.log(Object.keys(saveObject.data));
  /*
  Object.keys(saveObject.data)

  [
  'PlayerSave',
  'AllServersSave',
  'CompaniesSave',
  'FactionsSave',
  'AliasesSave',
  'GlobalAliasesSave',
  'MessagesSave',
  'StockMarketSave',
  'SettingsSave',
  'VersionSave',
  'AllGangsSave',
  'LastExportBonus',
  'StaneksGiftSave',
  'SaveTimestamp'
  ]
  */
  // let playerSaveObject = JSON.parse(saveObject.data.PlayerSave);

  // console.log(playerSaveObject.data);

  // console.log(playerSaveObject.data.gang.data.members.filter(weirdName));

  /*
  let playerSaveContent = saveObject.data.PlayerSave;

  console.log(playerSaveContent);
  let playerSaveObject = JSON.parse(playerSaveContent);
  
  
  saveObject.data.PlayerSave = JSON.stringify(playerSaveObject);
  console.log(saveObject.data.PlayerSave);
  */
};

function weirdName(element, index, array) { return element.data.name === `gang-7`;}