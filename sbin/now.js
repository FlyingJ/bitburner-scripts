/** @param {NS} ns */
export async function main(ns) {
	ns.tprint(`timeOrigin -> ${performance.timeOrigin}`);
	ns.tprint(`now -> ${performance.now()}`);

	ns.tprint(`${Object.getOwnPropertyNames(performance).sort()}`);
}