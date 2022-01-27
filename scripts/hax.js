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
    case 'deployHacknet':
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
    case 'buyServer':
    case 'purchaseServer':
    case 'buyServers':
      await runCommand(ns, 'purchaseServers');
      break;
    default:
      ns.tprint(`Oh no! ${command} isn't a valid command. Try: dashboard, autoHack, autoRemoteHack, or deployHacknet.`);
  }
}

export function autocomplete(data, args) {
  return ['autoHack',
    'autoRemoteHack',
    'dashboard',
    'deployHacknet',
    'purchaseServer'];
}