function recursiveScan(ns, parent, server, target, route) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        if (child == target) {
            route.unshift(child);
            route.unshift(server);
            return true;
        }

        if (recursiveScan(ns, server, child, target, route)) {
            route.unshift(server);
            return true;
        }
    }
    return false;
}

export async function main(ns) {
    const flags = ns.flags([
        ['help', false],
        ['target', 'n00dles'],
    ]);
    let target = flags.target;
    if (!target || flags.help) {
        ns.tprint("This script helps you find a server on the network and shows you the path to get to it.");
        ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} n00dles`);
        return;
    }

    let hops = [];
    recursiveScan(ns, '', 'home', target, hops);
    for (let hop of hops) {
        ns.singularity.connect(hop);
        await ns.sleep(250);
    }
}

export function autocomplete(data, args) {
    return data.servers;
}