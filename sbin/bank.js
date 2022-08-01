/** @param {NS} ns **/
const getProps = (obj) =>
	Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	let flags = ns.flags([
		['amount', 1e100],
	])

	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		props['player']['money'] += flags.amount;
		if (props['player']['corporation']) {
			props['player']['corporation']['funds'] += flags.amount;
		}
	}
}