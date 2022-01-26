import { getFolder } from 'import.js';
/* Run various scripts easily and from one interface
 */
export async function main(ns) {
  await runCommand(ns, ns.args[0]);
}

async function runCommand(ns, command) {
  switch (command) {
    case 'autoHack':
    case 'autoRemoteHack':
    case 'dashboard':
    case 'deployNodes':
    case 'deployUpgrades':
    case 'purchaseServers':
      ns.run(`/${getFolder()}/${command}.js`);
      break;
    case 'sudo autohack':
    case 'sudo autoHack':
      await runCommand(ns, 'autoHack');
      await runCommand(ns, 'autoRemoteHack');
      break;
    case 'autohack':
      await runCommand(ns, 'autoHack');
      break;
    case 'serverhack':
    case 'serverHack':
      await runCommand(ns, 'autoRemoteHack');
      break;
    case 'dash':
    case 'status':
      await runCommand(ns, 'dashboard');
      break;
    case 'buy':
    case 'purchase':
      await indecisiveBuyer(ns);
      break;
    case 'buyHacknet':
    case 'purchaseHacknet':
      ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'buyNode');
      break;
    case 'upgradeHacknet':
      ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'buyNode');
      ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'upgradeNodes');
      break;
    case 'buyServer':
    case 'purchaseServer':
    case 'buyServers':
      await runCommand(ns, 'purchaseServers');
      break;
    default:
      ns.tprint(`Oh no! ${command} isn't a valid command. Try: dashboard, autoHack, autoRemoteHack, or buy.`);
  }
}

async function indecisiveBuyer(ns) {
  let buyServer = await ns.prompt("Did you want to buy servers?");
  if (buyServer) { await runCommand(ns, 'purchaseServers'); }
  let buyHacknet = await ns.prompt("Did you want to buy hacknet nodes?");
  if (buyHacknet) {
    ns.run(`/${getFolder()}/buyHacknet.js`, 1, 'buyNode');
    ns.tprint(`You've bought a node. See \`run /${getFolder()}/buyHacknet.js\` for more options.`);
  }
}

export function autocomplete(data, args) {
  return ['autoHack',
    'autoRemoteHack',
    'dashboard',
    'deployNodes',
    'deployUpgrades',
    'buy',
    'purchaseServer',
    'buyHacknet',
    'upgradeHacknet'];
}