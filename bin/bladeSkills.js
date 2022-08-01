/** @param {NS} ns **/
export async function main(ns) {
	const TICK = 3 * 1000;    // sleep millis
	const overclockLevelMax = 90;

	class BladeSkillLevel {
		constructor(name) {
			this.name = name;
		}
		buy() {
			return ns.bladeburner.upgradeSkill(this.name);
		}
		cost() {
			if (this.name === 'Overclock' && this.level() >= overclockLevelMax) { return Infinity; }
			return ns.bladeburner.getSkillUpgradeCost(this.name);
		}
		level() { return ns.bladeburner.getSkillLevel(this.name); }
	}
	class AllBladeSkillLevels {
		constructor() {
			this.levels = [];
			for (let name of ns.bladeburner.getSkillNames()) { this.levels.push(new BladeSkillLevel(name)); }
		}
		async buy() {
			while (true) {
				let level = this.levels.sort((a, b) => a.cost() - b.cost())[0];
				while (!level.buy()) { await ns.sleep(TICK); }
			}
		}
	}
	ns.disableLog('sleep');

	let bladeSkillLevels = new AllBladeSkillLevels();
	await bladeSkillLevels.buy();
}