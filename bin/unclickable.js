/** @param {NS} ns **/
export async function main(ns) {
	let elements = Array.from(eval(`document`).querySelectorAll(`div[id='unclickable']`));
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
}