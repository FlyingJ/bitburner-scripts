const buffer = require('buffer');
const fs = require('fs');
const path = require('path');

const input = path.resolve(process.argv[2]);
// const output = path.resolve(process.argv[3]);

console.log(`Input: ${input}`);
// console.log(`Output: ${output}`);

main(input).then(() => {
  console.log('Done!');
})

async function main(input) {
  try {
    let saveObject = JSON.parse(buffer.Buffer.from(fs.readFileSync(input, 'utf8'), 'base64').toString());

    console.log(saveObject.data.PlayerSave);

    let PlayerSave = JSON.parse(saveObject.data.PlayerSave);

    const SPLOIT = `EditSaveFile`;

    console.log(PlayerSave.data.exploits);

    PlayerSave.data.exploits.push(SPLOIT);

    console.log(PlayerSave.data.exploits);

    saveObject.data.PlayerSave = JSON.stringify(PlayerSave);

    console.log(saveObject.data.PlayerSave);

    const newSaveFile = JSON.stringify(saveObject);

    fs.writeFileSync('a.out', buffer.Buffer.from(newSaveFile).toString('base64'), 'utf8');

  } catch (err) {
    console.error(err);
  }
}