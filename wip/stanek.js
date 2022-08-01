/** @param {NS} ns */
export async function main(ns) {
	ns.tprint(`Have Stanek : ${ns.stanek.acceptGift()}`);
	ns.tprint(``);

	/*
	ns.tprint(`Defined Fragments:`);
	ns.stanek.fragmentDefinitions().forEach((fragment) => {
		ns.tprint(`  * ${JSON.stringify(fragment)}`);
	});
	ns.tprint(``);
	*/
	
	// ns.tprint(`Active Fragments:`);
	do {
		for (let fragment of ns.stanek.activeFragments()) {
			if (fragment.id < 100) {
				ns.print(`Charging fragment ${fragment.id}...`);
				await ns.stanek.chargeFragment(fragment.x, fragment.y);
			}
		}
	} while (ns.getPlayer().money < 1e150);
}

/*
acceptGift()	                Accept Stanek's Gift by joining the Church of the Machine God
activeFragments()	            List of fragments in Stanek's Gift.
canPlaceFragment(rootX, rootY, rotation, fragmentId)	Check if fragment can be placed at specified location.
chargeFragment(rootX, rootY)	Charge a fragment, increasing its power.
clearGift()	                    Clear the board of all fragments.
fragmentDefinitions()	        List possible fragments.
getFragment(rootX, rootY)	    Get placed fragment at location.
giftHeight()	                Stanek's Gift height.
giftWidth()	                    Stanek's Gift width.
placeFragment(rootX, rootY, rotation, fragmentId)	Place fragment on Stanek's Gift.
removeFragment(rootX, rootY)	Remove fragment at location.

/wip/stanek.js: Defined Fragments:
/wip/stanek.js:   * {"id":0,"shape":[[false,true,true],[true,true,false]],"type":6,"power":1,"limit":1}
/wip/stanek.js:   * {"id":1,"shape":[[true,true,false],[false,true,true]],"type":6,"power":1,"limit":1}
/wip/stanek.js:   * {"id":5,"shape":[[true,true,true],[false,true,false]],"type":3,"power":1.3,"limit":1}
/wip/stanek.js:   * {"id":6,"shape":[[true,true,true,true]],"type":4,"power":2,"limit":1}
/wip/stanek.js:   * {"id":7,"shape":[[true,false,false],[true,true,true]],"type":5,"power":0.5,"limit":1}
/wip/stanek.js:   * {"id":10,"shape":[[true,true,true],[false,true,false]],"type":7,"power":2,"limit":1}
/wip/stanek.js:   * {"id":12,"shape":[[false,false,true],[true,true,true]],"type":8,"power":2,"limit":1}
/wip/stanek.js:   * {"id":14,"shape":[[false,false,true],[true,true,true]],"type":9,"power":2,"limit":1}
/wip/stanek.js:   * {"id":16,"shape":[[false,true,true],[true,true,false]],"type":10,"power":2,"limit":1}
/wip/stanek.js:   * {"id":18,"shape":[[false,true,true],[true,true,false]],"type":11,"power":3,"limit":1}
/wip/stanek.js:   * {"id":20,"shape":[[true,true,true,true]],"type":12,"power":1,"limit":1}
/wip/stanek.js:   * {"id":21,"shape":[[true,true],[true,true]],"type":13,"power":2,"limit":1}
/wip/stanek.js:   * {"id":25,"shape":[[true,false,false],[true,true,true]],"type":14,"power":0.5,"limit":1}
/wip/stanek.js:   * {"id":27,"shape":[[true,false,false],[true,true,true]],"type":15,"power":10,"limit":1}
/wip/stanek.js:   * {"id":28,"shape":[[false,false,true],[true,true,true]],"type":16,"power":2,"limit":1}
/wip/stanek.js:   * {"id":30,"shape":[[false,true,true],[true,true,false]],"type":17,"power":0.4,"limit":1}
/wip/stanek.js:   * {"id":100,"shape":[[false,true,true],[true,true,false],[false,true,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":101,"shape":[[true,true,true,true],[true,false,false,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":102,"shape":[[false,true,true,true],[true,true,false,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":103,"shape":[[true,true,true,false],[false,false,true,true]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":104,"shape":[[false,true,true],[false,true,false],[true,true,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":105,"shape":[[false,false,true],[false,true,true],[true,true,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":106,"shape":[[true,false,false],[true,true,true],[true,false,false]],"type":18,"power":1.1,"limit":99}
/wip/stanek.js:   * {"id":107,"shape":[[false,true,false],[true,true,true],[false,true,false]],"type":18,"power":1.1,"limit":99}
*/