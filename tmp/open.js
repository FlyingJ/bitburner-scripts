export function getPortToolCount(ns) {
	const TOOLS = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
	let count = 0;
	for (let tool of TOOLS) {
		if (ns.fileExists(tool)) {
			ns.tprint(tool + " has been found");
			count += 1;
		} else {
			ns.tprint(tool + " not found");
		}
	}

	ns.tprint("Found " + count + " port opening tools");
	return count;
}

export function canOpen(ns, target) {
	if (getPortToolCount(ns) >= ns.getServerNumPortsRequired(target)) {
		return true;
	} else {
		return false;
	}
}

export function openPorts(ns, server) {
	if (ns.fileExists("BruteSSH.exe")) {
		ns.brutessh(server);
	}
	if (ns.fileExists("FTPCrack.exe")) {
		ns.ftpcrack(server);
	}
	if (ns.fileExists("relaySMTP.exe")) {
		ns.relaysmtp(server);
	}
	if (ns.fileExists("HTTPWorm.exe")) {
		ns.httpworm(server);
	}
	if (ns.fileExists("SQLInject.exe")) {
		ns.sqlinject(server);
	}
	return;
}

export function openServer(ns, target) {
	if (canOpen(ns, target)) {
		openPorts(ns, target);
		ns.nuke(target);
	} else {
		ns.tprint("No can open " + target);
	}
	return;
}

/**
 * @param {NS} ns
 */
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help) {
		ns.tprint("This script attempts to root a target server.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

	const target = ns.args[0];
	openServer(ns, target);
}