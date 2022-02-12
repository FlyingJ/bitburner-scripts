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
    let saveContent = buffer.Buffer.from(fs.readFileSync(input, 'utf8'), 'base64').toString();
    let saveObject = JSON.parse(saveContent);
    let playerSaveContent = saveObject.data.PlayerSave;
    let playerSaveObject = JSON.parse(playerSaveContent);


    let exploits = playerSaveObject.data.exploits;
    const SPLOIT = `EditSaveFile`;
    if (! exploits.includes(SPLOIT)) {
      console.log(`${SPLOIT} not found...adding`);
      exploits.push(SPLOIT);
      playerSaveObject.data.exploits = exploits;
    }

    let hacknetNodes = [];
    for(let i = 0; i < 128; i++) {
      let hacknetNode = {
        'ctor': 'HacknetNode',
        'data': {
          'cores': 16,
          'level': 200,
          'moneyGainRatePerSecond': 1e10, // 30263.101477151051,
          'onlineTimeSeconds': 24767.20000005466,
          'ram': 64,
          'totalMoneyGenerated': 4677138.318787715,
          'name': `hacknet-node-${i}`
        }
      }
      hacknetNodes.push(hacknetNode);
    }
    playerSaveObject.data.hacknetNodes = hacknetNodes;

    saveObject.data.PlayerSave = JSON.stringify(playerSaveObject);
    const newSaveContent = JSON.stringify(saveObject);
    fs.writeFileSync('a.out', buffer.Buffer.from(newSaveContent).toString('base64'), 'utf8');
  } catch (err) {
    console.error(err);
  }
}