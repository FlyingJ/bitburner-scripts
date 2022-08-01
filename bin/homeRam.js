/** @param {NS} ns */
export async function main(ns) {
	do {
		await ns.sleep(200);
	} while (ns.singularity.getUpgradeHomeRamCost() < ns.getPlayer().money && ns.singularity.upgradeHomeRam())
}