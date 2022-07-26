/** @param {NS} ns **/

const getProps = (obj) =>
	Object.entries(obj).find(entry => entry[0]?.startsWith(`__reactProps`))?.[1]?.children?.props;

export async function main(ns) {
	let boxes = Array.from(eval(`document`).querySelectorAll(`[class*=MuiBox-root]`));
	let props = boxes.map(box => getProps(box)).find(x => x?.player);

	if (props) {
		// show classname to use
		// let className = boxes.find(x => getProps(x)?.player).className;
		// ns.tprintf(`INFO className: ${className}`);

let obsceneValue = 1e12;
			props.player.gainIntelligenceExp(obsceneValue);
		// get some bonuses
		//props.player.money = props.player.money * 1111;
		//props.player.hacking_exp = props.player.hacking_exp * 1111;

		// open the dev menu
		//props.router.toDevMenu();

		//props.player.karma = props.player.karma * 1000;
	}
}

/*
__reactProps$bc4jyr15m3r.children.props.player.gainIntelligenceExp

this.gainIntelligenceExp(retValue.int);

props.player.gainIntelligenceExp(obsceneValue);
/*