/** @param {NS} ns **/

const getProps = (obj) =>
Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		let obsceneValue = 1e100;
		props.player.gainIntelligenceExp(obsceneValue);
		ns.tprint(`Int Bonus: ${props.player.getIntelligenceBonus()}`);
	}
}