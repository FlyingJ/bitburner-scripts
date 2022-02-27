import { getFolder } from 'import.js';
/* Run various scripts easily and from one interface
 */
export async function main(ns) {
  const command = ns.args[0];
  const commandArgs = ns.args.slice(1);
  await runCommand(ns, command, commandArgs);
}

async function runCommand(ns, command, commandArgs) {
  switch (command) {
    case 'autoHack':
    case 'autoRemoteHack':
    case 'dashboard':
    case 'factionManager':
    case 'gangManager':
    case 'hacknetManager':
    case 'hacknetNodeManager':
    case 'hacknetUpgradeManager':
    case 'purchaseServers':
    case 'stockManager':
      ns.run(`/${getFolder()}/${command}.js`);
      break;
    case 'localGrow':
    case 'localHack':
      ns.run(`/${getFolder()}/${command}.js`, 1, commandArgs[0]);
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
      ns.tprint(`Oh no! ${command} isn't a valid command. Try: dashboard, autoHack, autoRemoteHack, or hacknetManager.`);
  }
}

export function autocomplete(data, args) {
  return [
    'autoHack',
    'autoRemoteHack',
    'dashboard',
    'factionManager',
    'gangManager',
    'hacknetManager',
    'localGrow',
    'localHack',
    'purchaseServer',
    'stockManager',
    ...data.servers
  ];
}