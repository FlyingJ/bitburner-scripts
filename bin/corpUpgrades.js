/** @param {NS} ns */
export async function main(ns) {
  let maxSpend = 1e100;
  let maxLevel = 1500;

  [
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
  ].forEach((upgrade) => {
    while (
      ns.corporation.getUpgradeLevelCost(upgrade) < maxSpend &&
      ns.corporation.getUpgradeLevel(upgrade) < maxLevel
    ) {
      ns.corporation.levelUpgrade(upgrade);
    }
  });
}