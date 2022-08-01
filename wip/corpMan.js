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

/** @param {NS} ns **/
export async function main(ns) {
  class Upgrade {
    constructor(name) { this.name = name; }
    buy() { return ns.corporation.levelUpgrade(this.name); }
    cost() { return ns.corporation.getUpgradeLevelCost(this.name); }
  }
  
  class AllUpgrades {
    constructor() {
      this.upgrades = [];
      this.MAXSPEND = 1e75;
      UPGRADES.forEach((name) => {
        this.upgrades.push(new Upgrade(name));
      });
    }
    buy() {}
  }

  class Unlock {
    constructor(name) { this.name = name; }
    buy() { return ns.corporation.unlockUpgrade(this.name); }
    cost() { return ns.corporation.getUnlockUpgradeCost(this.name); }
    purchased() { return ns.corporation.hasUnlockUpgrade(this.name); }
  }

  class AllUnlocks {
    constructor() {
      this.unlocks = [];
      UNLOCKS.forEach( (name) => {
        this.unlocks.push(new Unlock(name));
      });
    }
    buy() {}
  }
  await manageCorporation(ns);
}

async function manageCorporation(ns) {
  UNLOCKS.forEach((unlock) => {
    if (!haveUnlock(ns, unlock) && ns.getPlayer()['money'] > ns.corporation.getUnlockUpgradeCost(unlock)) {
      getUnlock(ns, unlock);
    }
  });
  UPGRADES.forEach((upgrade) => {
    while (ns.corporation.getUpgradeLevelCost(upgrade) < MAXSPEND) { ns.corporation.levelUpgrade(upgrade); }
  });
}

async function haveUnlock(ns, unlock) { return ns.corporation.hasUnlockUpgrade(unlock); }
async function getUnlock(ns, unlock) {
  // void functions are so fun with regard to result checking
  ns.corporation.unlockUpgrade(unlock);
  // return something useful, e.g., whether the purchase succeeded
  return haveUnlock(ns, unlock);
}