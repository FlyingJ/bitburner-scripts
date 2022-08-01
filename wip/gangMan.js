const ATTRIBUTES = ['hack', 'str', 'def', 'dex', 'agi', 'cha'];
const TASKS = [`Train Hacking`, `Ethical Hacking`, `Money Laundering`, `Cyberterrorism`];
const TICK = 10 * 1000;

/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog('sleep');
  ns.tail();

  if (! ns.gang.inGang()) {
    if (! ns.gang.createGang(`NiteSec`)) { ns.exit(); }
  }

  while (true) {
    recruitment(ns);
    ascension(ns);
    tasks(ns);
    await ns.sleep(TICK);
  }
}

function recruitment(ns) {
  if (!canRecruit(ns)) { return false; }
  let name = getRecruitName();
  return (recruit(ns, name) && setTask(ns, name, `Train Hacking`));
}
function canRecruit(ns) { return ns.gang.canRecruitMember(); }
function getRecruitName() { return Math.random().toString(16).substring(2, 8); }
function recruit(ns, name) { return ns.gang.recruitMember(name); }
function setTask(ns, name, task) { return ns.gang.setMemberTask(name, task); }


function ascension(ns) {
  for (let member of getGangData(ns)) {
    let ascendResult = ns.gang.getAscensionResult(member.name);
    if (typeof ascendResult === 'undefined') { continue; }

    let activeAttribute = getActiveAttribute(member, ascendResult);
    ns.print(`${member.name}.${activeAttribute.name}: ${activeAttribute.ascGain - ascendGainTarget(activeAttribute)}`);
    if (activeAttribute.ascGain > ascendGainTarget(activeAttribute)) {
      ns.gang.ascendMember(member.name);
      ns.toast(`Ascended ${member.name}`);
    }
  }
}
function getActiveAttribute(member, ascendResult) {
  let attrSnaps = [];
  for (let attribute of ATTRIBUTES) {
    let expString = `${attribute}_exp`;
    let baseMultString = `${attribute}_mult`;
    let ascMultString = `${attribute}_asc_mult`;
    attrSnaps.push(
      {
        'name': attribute,
        'rank': member[attribute],
        'xp': member[expString],
        'baseMult': member[baseMultString],
        'ascMult': member[ascMultString],
        'ascResult': ascendResult[attribute],
        'ascGain': member[ascMultString] * (ascendResult[attribute] - 1),
      }
    );
  }
  return attrSnaps.sort((a, b) => b.xp - a.xp)[0];
}
function ascendGainTarget(attributeData) { return (Math.log10(attributeData.ascMult) > 1) ? Math.log10(attributeData.ascMult) : 1; }

function tasks(ns) {
  let gangData = getGangData(ns);
  let trainees = gangData.filter(hasLowAscensionMultiplier);
  trainees.forEach((trainee) => { setTask(ns, trainee.name, `Train Hacking`) });
  let workers = gangData.filter(hasHighAscensionMultiplier).sort((a, b) => b.hack_asc_mult - a.hack_asc_mult);
  let topWorker = workers.shift();
  setTask(ns, topWorker.name, `Ethical Hacking`);
  let aproposWorkerTask = getWorkerTask(ns);
  workers.forEach((worker) => {
    setTask(ns, worker.name, aproposWorkerTask);
  });
}

function getWorkerTask(ns) {
  if (ns.getFactionRep(`NiteSec`) < 2500000) { return `Cyberterrorism`; }
  return `Money Laundering`;
}

function getGangData(ns) {
  let data = [];
  ns.gang.getMemberNames().forEach((name) => {
    data.push(ns.gang.getMemberInformation(name));
  });
  return data;
}
function hasLowAscensionMultiplier(element) { return element.hack_asc_mult < 100.0; }
function hasHighAscensionMultiplier(element) { return element.hack_asc_mult >= 100.0; }