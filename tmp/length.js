/** @param {NS} ns */
export async function main(ns) {
	const SCRIPT = `/bin/hack.js`;
	const scriptRam = ns.getScriptRam(SCRIPT);
	for (let rank = 1; rank <= 20; rank++) {
		let ram = Math.pow(2, rank);
		let cost = ns.getPurchasedServerCost(ram);
		let threads = Math.floor(ram / scriptRam);
		ns.tprintf("%-3d -> %7d -> %15d -> %6d", rank, ram, cost, threads);
	}
}