export const UNLOCKS = [
  `Export`,
  `Smart Supply`,
  `Market Research - Demand`,
  `Market Data - Competition`,
  `VeChain`,
  `Shady Accounting`,
  `Government Partnership`,
  `Warehouse API`,
  `Office API`,
];

export const UPGRADES = [
`Smart Factories`,
`Wilson Analytics`,
`Neural Accelerators`,
`Project Insight`,
`Smart Storage`,
`Nuoptimal Nootropic Injector Implants`,
`FocusWires`,
`DreamSense`,
`Speech Processor Implants`,
`ABC SalesBots`,
];

export const INDUSTRIES = [
`Agriculture`,
`Chemical`,
`Computer`,
`Energy`,
`Fishing`,
`Food`,
`Healthcare`,
`Mining`,
`Pharmaceutical`,
`RealEstate`,
`Robotics`,
`Software`,
`Tobacco`,
`utilities`,
];

export const CITIES = [
`Aevum`,
`Chongqing`,
`New Tokyo`,
`Ishima`,
`Sector-12`,
`Volhaven`,
];

export const PRODUCTIONBOOSTERS = [
]

/** @param {NS} ns **/
export async function main(ns) {
	UNLOCKS.forEach((unlock) => {
		if((! ns.corporation.hasUnlockUpgrade(unlock)) &&
		    ns.getPlayer()['money'] > ns.corporation.getUnlockUpgradeCost(unlock)) { ns.corporation.unlockUpgrade(unlock); }
	});
	UPGRADES.forEach((upgrade) => {
		while(ns.corporation.getUpgradeLevelCost(upgrade) < 10e12) { ns.corporation.levelUpgrade(upgrade); }
	});
}