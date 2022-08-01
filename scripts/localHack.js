const SCRIPT = '/scripts/localHack.js';
const HACKSCRIPT = '/scripts/hack.js';
const HOME = 'home';
const RESERVERAM = 0.2; // RAM in GB to reserve for running other commands, scripts

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
		ns.tprint(`Killed running instance of ${HACKSCRIPT}`);
	}

	const freeRam = ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME);
	const threadRam = ns.getScriptRam(HACKSCRIPT);

	const usableRam = Math.floor((1.0 - RESERVERAM) * freeRam);
	const threads = Math.floor(usableRam / threadRam);

	if (threads === 0) {
		ns.print(`Insufficient RAM for hack threads`);
		ns.exit();
	}
	ns.exec(HACKSCRIPT, HOME, threads, target, threads);
}