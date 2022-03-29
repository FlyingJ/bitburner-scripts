const TICK = 500;    // standard sleep millis

/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog('sleep');
	await buyUpgrades(ns);
}

async function buyUpgrades(ns) { while (await buyUpgrade(ns)) { await ns.sleep(TICK); }; }
async function buyUpgrade(ns) {
	let lowCostSkill = getLowCostSkill(ns);
	while (lowCostSkill.cost > ns.bladeburner.getSkillPoints()) { await ns.sleep(3 * TICK); }
	return ns.bladeburner.upgradeSkill(lowCostSkill.name);
}
function getLowCostSkill(ns) {
	let skillUpgrades = getSkillUpgrades(ns);
	let sortedSkillUpgrades = skillUpgrades.sort((a, b) => a.cost - b.cost);
	let lowCostSkill = sortedSkillUpgrades[0];
	return lowCostSkill;
}
function getSkillUpgrades(ns) {
	let skillUpgrades = [];
	ns.bladeburner.getSkillNames().forEach((name) => {
		skillUpgrades.push({
			'name': name,
			'cost': ns.bladeburner.getSkillUpgradeCost(name),
		});
	});
	return skillUpgrades;
}
/*
ns.bladeburner.getSkillPoints();

ns.bladeburner.getSkillNames();

ns.bladeburner.upgradeSkill(name);
ns.bladeburner.getSkillLevel(name);
ns.bladeburner.getSkillUpgradeCost(name);

*/