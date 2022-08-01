/** @param {NS} ns */
export async function main(ns) {
	const TICK = 10 * 1000;
	do {
		ns.singularity.checkFactionInvitations().forEach((faction) => {
			ns.singularity.joinFaction(faction);
		})
		await ns.sleep(TICK);
	} while (true);
}