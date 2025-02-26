import { getHackScript, getServerPrefix } from 'import.js';
let hackablePorts;

/* Searches for servers that are hackable,
 * cracks them if you don't have root access,
 * installs a hack script, and instructs them to
 * HACK THEMSELVES
 */
export const main = async function (ns) {
    do {
        findHackablePorts(ns);
        await findServer(ns, 'home', 'home', hackServer);
        await ns.sleep(10 * 1000);
    } while (true);
}

async function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix()) && !server.includes('hacknet-node'));
    for (const server of servers) {
        const success = await func.call(this, ns, server);
        if (success) {
            await findServer(ns, targetServer, server, func);
        }
    }
}

async function hackServer(ns, server) {
    if (!crackServer(ns, server)) {
        return false;
    }

    let script = getHackScript();
    await ns.scp(script, server);
    if (!ns.isRunning(script, server)) {
        ns.killall(server);
        let scriptRam = ns.getScriptRam(script);
        let serverRam = ns.getServerMaxRam(server);
        let threads = Math.floor(serverRam / scriptRam);
        if (threads > 0) {
            ns.print(`Starting ${threads} processes on ${server}`);
            ns.exec(script, server, threads, server, threads);
        }
    }
    return true;
}

function crackServer(ns, server) {
    if (ns.hasRootAccess(server)) {
        return true;
    }

    if (ns.fileExists('BruteSSH.exe')) {
        ns.brutessh(server);
    }
    if (ns.fileExists('FTPCrack.exe')) {
        ns.ftpcrack(server);
    }
    if (ns.fileExists('relaySMTP.exe')) {
        ns.relaysmtp(server);
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        ns.httpworm(server);
    }
    if (ns.fileExists('SQLInject.exe')) {
        ns.sqlinject(server);
    }
    if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel() ||
        ns.getServerNumPortsRequired(server) > hackablePorts) {
        return false;
    } else {
        ns.nuke(server);
        ns.tprint(`New Server Cracked: ${server}!`);
        return true;
    }
}

export function findHackablePorts(ns) {
    let hackPorts = 0;
    if (ns.fileExists('BruteSSH.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('FTPCrack.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('relaySMTP.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('HTTPWorm.exe')) {
        hackPorts += 1;
    }
    if (ns.fileExists('SQLInject.exe')) {
        hackPorts += 1;
    }
    hackablePorts = hackPorts;
}