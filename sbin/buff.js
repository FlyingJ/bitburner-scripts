/** @param {NS} ns **/

const getProps = (obj) =>
	Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	function goalAchieved(attributes, goal) {
		let achieved = true;
		attributes.forEach((attribute) => {
			achieved &= (attribute.getLevel() > goal);
		});
		return achieved;
	}

	let flags = ns.flags([['goal', 1000]]);

	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		const attributes = [
			{
				gainExp: (value) => { props.player.gainAgilityExp(value); },
				getExp: () => { return props.player.agility_exp; },
				getLevel: () => { return props.player.agility; },
			},
			{
				gainExp: (value) => { props.player.gainCharismaExp(value); },
				getExp: () => { return props.player.charisma_exp; },
				getLevel: () => { return props.player.charisma; },
			},
			{
				gainExp: (value) => { props.player.gainDefenseExp(value); },
				getExp: () => { return props.player.defense_exp; },
				getLevel: () => { return props.player.defense; },
			},
			{
				gainExp: (value) => { props.player.gainDexterityExp(value); },
				getExp: () => { return props.player.dexterity_exp; },
				getLevel: () => { return props.player.dexterity; },
			},
			{
				gainExp: (value) => { props.player.gainHackingExp(value); },
				getExp: () => { return props.player.hacking_exp; },
				getLevel: () => { return props.player.hacking; },
			},
			{
				gainExp: (value) => { props.player.gainStrengthExp(value); },
				getExp: () => { return props.player.strength_exp; },
				getLevel: () => { return props.player.strength; },
			},
		]
		do {
			attributes.forEach((attribute) => {
				attribute.gainExp(attribute.getExp() * 0.1);
			})
		} while (!goalAchieved(attributes, flags.goal))
		ns.tprint(`We are strong!`);
	}
}