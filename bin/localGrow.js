const SCRIPT = '/scripts/localGrow.js';
const GROWSCRIPT = '/scripts/grow.js';
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

	if (ns.scriptRunning(GROWSCRIPT, HOME)) {
		ns.scriptKill(GROWSCRIPT, HOME);
		ns.tprint(`Killed running instance of ${GROWSCRIPT}`);
	}

	const freeRam = ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME);
	const threadRam = ns.getScriptRam(GROWSCRIPT);

	const usableRam = (RESERVERAM < freeRam) ? freeRam - RESERVERAM : 0;
	const threads = Math.floor(usableRam / threadRam);

	ns.exec(GROWSCRIPT, HOME, threads, target, threads);
}