const fs = require('fs');
const path = require('path');

const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);

console.log(`Input: ${input}`);
console.log(`Output: ${output}`);

main(input, output).then(() => {
  console.log('Done!');
})

async function main(input, output) {
  fs.readFile(input, (err, data)) => {
    if (err) throw err;
    console.log(`${typeof data}`);
  }
}