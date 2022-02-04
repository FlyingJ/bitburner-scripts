const ATTRIBUTES = ['hack', 'str', 'def', 'dex', 'agi', 'cha'];
const TICK = 5000;

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog('sleep');
  ns.tail();

  while (true) {
    let members = ns.gang.getMemberNames();
    for (let member of members) {
      let memberInfo = ns.gang.getMemberInformation(member);

      let ascendResult = ns.gang.getAscensionResult(member);
      if (typeof ascendResult === 'undefined') { continue; }

      let attrSnaps = [];
      for (let attribute of ATTRIBUTES) {
        let expString = `${attribute}_exp`;
        let baseMultString = `${attribute}_mult`;
        let ascMultString = `${attribute}_asc_mult`;
        let attrSnap = {
          'name': attribute,
          'rank': memberInfo[attribute],
          'xp': memberInfo[expString],
          'baseMult': memberInfo[baseMultString],
          'ascMult': memberInfo[ascMultString],
          'ascResult': ascendResult[attribute],
          'ascGain': memberInfo[ascMultString] * (ascendResult[attribute] - 1),
        };
        attrSnaps.unshift(attrSnap);
      }

      let growthFocus = attrSnaps.sort((a, b) => b.xp - a.xp)[0];
      // ns.print(`${memberInfo.name} -> ${growthFocus.name} -> ${growthFocus.ascGain}`);

      if (growthFocus.ascGain > 1) { ns.gang.ascendMember(memberInfo.name) };
    }
    await ns.sleep(TICK);
  }
}