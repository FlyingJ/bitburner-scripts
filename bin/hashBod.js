/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		['Improve Studying', 'Improve Gym Training'].forEach((buff) => { ns.hacknet.spendHashes(buff); })
		await ns.sleep(200);
	}
}