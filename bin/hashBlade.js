/** @param {NS} ns */
export async function main(ns) {
	let TICK = 200; // sleep millis
	do {
		ns.hacknet.spendHashes(`Exchange for Bladeburner Rank`);
		ns.hacknet.spendHashes(`Exchange for Bladeburner SP`);
		await ns.sleep(TICK);
	} while (ns.getPlayer().money < 1e150);
}