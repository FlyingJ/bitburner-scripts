const SCRIPT = '/scripts/homeHack.js';
const HACKSCRIPT = '/scripts/hack.js';
const HOME = 'home';
const RESERVERAM = 20; // RAM in GB to reserve for running other commands, scripts

export function autocomplete(data, args) {
	return [...data.servers];
}

/** @param {NS} ns **/
export async function main(ns) {
	const target = ns.args[0];
	if (typeof target === 'undefined') {
		ns.tprint(`Usage: run ${SCRIPT} TARGET`);
		ns.tprint(`Example: run ${SCRIPT} iron-gym`);
		return;
	}

	if (ns.scriptRunning(HACKSCRIPT, HOME)) {
		ns.scriptKill(HACKSCRIPT, HOME);
		ns.print(`Killed running instance of ${HACKSCRIPT}`);
	}

	const freeRam = getServerFreeRam(ns, HOME);
	const usableRam = freeRam - RESERVERAM;
	if (usableRam < 0) {
		ns.tprint(`Insufficient RAM for extra hackings`);
		return;
	}

	const instanceRam = ns.getScriptRam(HACKSCRIPT);
	const threads = Math.floor(usableRam / instanceRam);
	return ns.exec(HACKSCRIPT, HOME, threads, target, threads);
}

function getServerFreeRam(ns, server) { return ns.getServerMaxRam(server) - ns.getServerUsedRam(server); }