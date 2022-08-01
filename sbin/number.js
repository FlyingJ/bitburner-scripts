/** @param {NS} ns */
export async function main(ns) {
	const n = 0;
	ns.tprint(`${n} -> ${n.toExponential()}`);
	n.__proto__.toExponential = () => { return 'poop' };
	ns.tprint(`Polluted ${n.__proto__}`);
	for (let i = 0; i < 30; i++) {
		ns.tprint(`${n} -> ${n.toExponential()}`);
		await ns.sleep(1000);
	}
}