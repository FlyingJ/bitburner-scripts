import { getHackScript } from 'import.js';

const RESERVERAM = 20; // RAM in GB to reserve for running other commands, scripts

/** @param {NS} ns **/
export async function main(ns) {

	ns.scriptRunning(getHackScript(), 'home') && ns.scriptKill(getHackScript(), 'home');

	const freeRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
	const usableRam = freeRam - RESERVERAM;
	if (usableRam < 0) {
		ns.tprint(`Insufficient RAM for extra hackings`);
		return;
	}

	const instanceRam = ns.getScriptRam(getHackScript());
	const threads = Math.floor(usableRam / instanceRam);
	ns.run(getHackScript(), threads, 'iron-gym', threads);
}