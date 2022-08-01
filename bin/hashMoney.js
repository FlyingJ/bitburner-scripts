/** @param {NS} ns */
export async function main(ns) {
	let TICK = 200; // sleep millis
	let GOAL = 1e150;
	do {
		ns.hacknet.spendHashes(`Sell for Money`);
		await ns.sleep(TICK);
	} while (ns.getPlayer().money < GOAL);
}