import { getFolder, getServerPrefix } from 'import.js';

const TICK = 3 * 1000;

let maxServers;
let servers;

/*
 * Purchases the best server available with the
 * user's current money. If the server limit is
 * reached, replaces the worst server. Repeatable.
 */
export async function main(ns) {
    class Server {
        constructor() {
            // NNNN
        }
    }
    class AllServers {
        constructor() {
            this.hostnamePrefix = getServerPrefix();
            this.servers = [];
        }

    }
    // Default Values
    maxServers = ns.getPurchasedServerLimit();
    servers = ns.getPurchasedServers(true);
    serverInfo(ns);
    await buyServers(ns);
}

function serverInfo(ns) {
    ns.tprint(`You have ${servers.length}/${maxServers} servers`);
    Object.entries(groupServers(ns)).map((ramServers) => {
        ns.tprint(`${ramServers[0]}GB: ${ramServers[1]}`);
    });
}

function groupServers(ns) {
    let groupedServers = {};
    servers.forEach((server) => {
        let ram = ns.getServerRam(server)[0];
        groupedServers[ram] = groupedServers[ram] || [];
        groupedServers[ram].push(server);
    });
    return groupedServers;
}

async function buyServers(ns) {
    let ram = ns.getPurchasedServerMaxRam();
    let myMoney = ns.getServerMoneyAvailable('home');
    let cost = ns.getPurchasedServerCost(ram);
    let belowServerLimit = true;
    while (belowServerLimit) {
        while (cost > myMoney) { ns.sleep(TICK); }
        belowServerLimit = buyServer(ns, ram);
    }
}

function buyServer(ns, ram) {
    if (servers.length == maxServers) {
        let success = removeWeakestServer(ns, ram);
        if (!success) { return false; }
    }
    let server = ns.purchaseServer(`${getServerPrefix()}-${ram}GB`, ram);
    servers.push(server);
    ns.tprint(`Purchased ${server}: ${ram}GB`);
    return true;
}

function removeWeakestServer(ns, newRam) {
    let groupedServers = groupServers(ns);
    let min = Math.min(...Object.keys(groupedServers));
    if (min >= newRam) {
        ns.tprint(`Your smallest server has ${min}GB RAM and you wanted to purchase ${newRam}GB server`);
        return false;
    }
    let smallest_server = groupedServers[min][0];
    ns.killall(smallest_server);
    let result = ns.deleteServer(smallest_server);
    servers = ns.getPurchasedServers(true);
    return true;
}


// ================================================================================================= //
// ================================================================================================= //
// ================================================================================================= //
// ================================================================================================= //
// ================================================================================================= //
let maxValueServers;
let serverValue = 0;

/* Identify servers worth more than $10 Billion,
 * deploy the hack script and attack those servers
 * using all purchased servers.
 */
export async function main(ns) {
    maxValueServers = {
        zero: [],
        million: [],
        billion: [],
        trillion: []
    };
    findServer(ns, 'home', 'home', checkValue);
    ns.run(`/${getFolder()}/remoteHack.js`, 1, highest(ns).join(','));
}

function findServer(ns, startServer, targetServer, func) {
    let servers = ns.scan(targetServer, true).filter((server) => server !== startServer && !server.includes(getServerPrefix));
    if (!ns.hasRootAccess(targetServer)) { return false; }
    servers.forEach((server) => {
        func.call(this, ns, server);
        if (ns.hasRootAccess(server)) {
            findServer(ns, targetServer, server, func);
        }
    });
}

function checkValue(ns, server) {
    if (!ns.hasRootAccess(server)) {
        return;
    }
    let serverMoney = ns.getServerMaxMoney(server);
    if (serverMoney > 1e12) {
        maxValueServers.trillion.push(server);
    } else if (serverMoney > 1e9) {
        maxValueServers.billion.push(server);
    } else if (serverMoney > 0) {
        maxValueServers.million.push(server);
    } else {
        maxValueServers.zero.push(server);
    }
}

function highest(ns) {
    if (maxValueServers.trillion.length > 0) {
        return maxValueServers.trillion;
    }
    if (maxValueServers.billion.length > 0) {
        return maxValueServers.billion;
    }
    if (maxValueServers.million.length > 0) {
        return maxValueServers.million;
    }
}






getPurchasedServerCost(ram)	Get cost of purchasing a server.
getPurchasedServerLimit()	Returns the maximum number of servers you can purchase.
getPurchasedServerMaxRam()	Returns the maximum RAM that a purchased server can have.
getPurchasedServers()	Returns an array with the hostnames of all of the servers you have purchased.

deleteServer(host)	Delete a purchased server.

exec(script, host, numThreads, args)	Start another script on any server.

getScriptRam(script, host)	Get the ram cost of a script.
getServer(host)	Returns a server object for the given server. Defaults to the running script's server if host is not specified.