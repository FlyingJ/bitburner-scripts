/** @param {NS} ns **/
export async function main(ns) {
	//let element = eval(`document`).querySelectorAll(`div[id='unclickable']`);
	//ns.tprint(Object.keys(element));

	const uc = document.getElementById("unclickable");

	let evt = new MouseEvent("click", {
		bubbles: true,
		cancelable: true,
		view: window,
	});

	uc.dispatchEvent(evt);
	/*
	elements.forEach(element => {
			element.dispatchEvent(
			new MouseEvent(`click`, {
				view: window,
				bubbles: true,
				cancelable: true,
				buttons: 1,
			})
		)
	}
	*/
}