/** @param {NS} ns */
export async function main(ns) {

	class Action {
		constructor(type, name) {
			this.type = type;
			this.name = name;
		}
		chances() {
			let chances = ns.bladeburner.getActionEstimatedSuccessChance(this.type, this.name);
			let high = chances[1];
			let low = chances[0];
			let spread = high - low;
			let mean = spread / 2;
			return {
				'low': low,
				'high': high,
				'mean': mean,
				'spread': spread,
			};
		}
		level() { return ns.bladeburner.getActionCurrentLevel(this.type, this.name); }
		remaining() { return ns.bladeburner.getActionCountRemaining(this.type, this.name); }
		repGain() { return ns.bladeburner.getActionRepGain(this.type, this.name, this.level()); }
		start() { return ns.bladeburner.startAction(this.type, this.name); }
		stop() { return ns.bladeburner.stopBladeburnerAction(); }
		time() { return ns.bladeburner.getActionTime(this.type, this.name); }
	}

}

/*

getBonusTime()	Get bladeburner bonus time.
getCity()	Get current city.
switchCity(name)	Travel to another city in bladeburner.
getCityChaos(name)	Get chaos of a city.
getCityCommunities(name)	Get number of communities in a city.
getCityEstimatedPopulation(name)	Get estimated population in city.

getCurrentAction()	Get current action.

getActionAutolevel(type, name)	Get whether an action is set to autolevel.

getActionMaxLevel(type, name)	Get the maximum level of an action.
getActionRepGain(type, name, level)	Get the reputation gain of an action.
getActionTime(type, name)	Get the time to complete an action.

setActionAutolevel(type, name, autoLevel)	Set an action autolevel.
setActionLevel(type, name, level)	Set the level of an action.

getGeneralActionNames()	List all general actions.
getContractNames()	List all contracts.
getOperationNames()	List all operations.
getBlackOpNames()	List all black ops.
getBlackOpRank(name)	Get black op required rank.
getRank()	Get player bladeburner rank.

getStamina()	Get bladeburner stamina.
getTeamSize(type, name)	Get team size.

setTeamSize(type, name, size)	Set team size.

joinBladeburnerDivision()	Join the bladeburner division.
joinBladeburnerFaction()	Join the bladeburner faction.
getSkillLevel(name)	Get skill level.
getSkillNames()	List all skills.
getSkillPoints()	Get bladeburner skill points.
getSkillUpgradeCost(name)	Get cost to upgrade skill.
upgradeSkill(name)	Upgrade skill.

*/