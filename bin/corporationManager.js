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
];

/** @param {NS} ns **/
export async function main(ns) {
  await manageCorporation(ns);
}

async function manageCorporation(ns) {
  UNLOCKS.forEach((unlock) => {
    if (!haveUnlock(ns, unlock) && ns.getPlayer()['money'] > ns.corporation.getUnlockUpgradeCost(unlock)) {
      getUnlock(ns, unlock);
    }
  });
  UPGRADES.forEach((upgrade) => {
    while (ns.corporation.getUpgradeLevelCost(upgrade) < 10e50) { ns.corporation.levelUpgrade(upgrade); }
  });
}

async function haveUnlock(ns, unlock) { return ns.corporation.hasUnlockUpgrade(unlock); }
async function getUnlock(ns, unlock) {
  // void functions are so fun with regard to result checking
  ns.corporation.unlockUpgrade(unlock);
  // return something useful, e.g., whether the purchase succeeded
  return haveUnlock(ns, unlock);
}