const MONEYSHOT = 1e13;

/** @param {NS} ns **/
const getProps = (obj) =>
	Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		// show classname to use
		let className = boxes.find(x => getProps(x)?.player).className;
		ns.tprintf(`INFO className: ${className}`);

		if (props.player['corporation']['funds'] < MONEYSHOT) {
			props.player['corporation']['funds'] = MONEYSHOT;
		} else {
			props.player['corporation']['funds'] = props.player['corporation']['funds'] * MONEYSHOT;
		}
	}
}