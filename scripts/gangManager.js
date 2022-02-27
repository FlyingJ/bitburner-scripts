const ATTRIBUTES = ['hack', 'str', 'def', 'dex', 'agi', 'cha'];
const TICK = 10 * 1000;

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog('sleep');
  ns.tail();

  while (true) {
    recruitment(ns);
    ascension(ns);
    await ns.sleep(TICK);
  }
}

function recruitment(ns) {
  if (!canRecruit(ns)) { return false; }
  let name = getRecruitName();
  return (recruit(ns, name) && setTask(ns, name, `Train Hacking`));
}

function setTask(ns, name, task) { return ns.gang.setMemberTask(name, task); }
function recruit(ns, name) { return ns.gang.recruitMember(name); }
function canRecruit(ns) { return ns.gang.canRecruitMember(); }
function getRecruitName() { return Math.random().toString(16).substring(2, 8); }

function getGangData(ns) {
  let members = ns.gang.getMemberNames();
  for (let member of members) {

  }
}

function ascension(ns) {
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
    ns.print(`${memberInfo.name}.${growthFocus.name}: ${growthFocus.ascGain - ascGainTarget(growthFocus)}`);
    if (growthFocus.ascGain > ascGainTarget(growthFocus)) {
      ns.gang.ascendMember(memberInfo.name)
    }
  }
}

function ascGainTarget(attributeData) { return (Math.log10(attributeData.ascMult) > 1) ? Math.log10(attributeData.ascMult): 1; }

function workAssignment(ns) {
  let members = [];
  for (let member of ns.gang.getMemberNames()) {
    members.push(ns.gang.getMemberInformation(member))
  }
}