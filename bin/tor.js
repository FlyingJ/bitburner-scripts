/** @param {NS} ns **/
export async function main(ns) {
	const TICK = 10 * 1000;    // sleep millis

	class Program {
		constructor(name) { this.name = name; }
		buy() { return this.purchased() ? this.purchased() : ns.purchaseProgram(this.name); }
		cost() { return ns.getDarkwebProgramCost(this.name); }
		purchased() { return (this.cost() === 0) ? true : false; }
	}

	class Tor {
		constructor() { this.name = 'tor'; }
		buy() { return ns.purchaseTor(); }
	}

	class AllPrograms {
		constructor() {
			this.programs = [];
			for (let name of ns.getDarkwebPrograms()) { this.programs.push(new Program(name)); }
		}
		async buy() {
			for (let program of this.programs.sort((a, b) => a.cost() - b.cost())) {
				while (!program.buy()) { await ns.sleep(TICK); }
			}
		}
	}

	ns.disableLog('sleep');
	ns.clearLog();

	let tor = new Tor();
	while (!tor.buy()) { await ns.sleep(TICK); }

	let programs = new AllPrograms();
	await programs.buy();
}