/** @param {NS} ns */
export async function main(ns) {
	const data = ns.flags([
		['faction', 'Sector-12'],
		['work', 'Security Work'],
		['focus', false],
		['period', 10 * 1000],
		['goal', 100],
	]);
	let faction = data.faction;
	let work = data.work;
	let focus = data.focus;
	let period = data.period;
	let goal = data.goal;

	function goalAchieved(skills, goal) {
		let player = ns.getPlayer();
		let achieved = true;
		for (let skill of skills) {
			achieved = achieved && player[skill] >= goal;
		}
		return achieved;
	}

	const skillSets = {
		'Hacking Contracts': ['hacking'],
		'Field Work': ['hacking', 'strength', 'defense', 'dexterity', 'agility', 'charisma'],
		'Security Work': ['hacking', 'strength', 'defense', 'dexterity', 'agility'],
	}

	do {
		ns.workForFaction(faction, work, focus);
		await ns.sleep(period);
	} while (!goalAchieved(skillSets[work], goal));

	ns.stopAction();
}