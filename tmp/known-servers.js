function scan(ns, parent, server, list) {
	const CHILDREN = ns.scan(server);
	for (let child of CHILDREN) {
		if (parent == child) {
			continue;
		}
		list.push(child);

		scan(ns, server, child, list);
	}
}

export function list_servers(ns) {
	const list = [];
	scan(ns, '', 'home', list);
	return list;
}

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help) {
		ns.tprint("This script lists all servers on which you can run scripts.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

	const SERVERS = list_servers(ns).filter(s => ns.hasRootAccess(s)).concat(['home']);
	for (const SERVER of SERVERS) {
		const USED = ns.getServerUsedRam(SERVER);
		const MAXRAM = ns.getServerMaxRam(SERVER);
		ns.tprint(SERVER + ":open:" + (MAXRAM - USED));
	}
}