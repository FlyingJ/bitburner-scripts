/** @param {NS} ns */
export async function main(ns) {
	while(true) {
		ns.tprint(ns.bladeburner.getCurrentAction());
		await ns.sleep(3000);
	}
}