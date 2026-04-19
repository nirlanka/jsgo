"use strict";
// @ts-check

export let camelToDash = (camelStr) => {
	let dashStr = "";
	for (let x of camelStr.split("")) {
		//// Capital letters (but not numbers etc.)
		if (x.toUpperCase() === x && x.toLowerCase() !== x) {
			dashStr += "-";
			dashStr += x.toLowerCase();
			continue;
		}

		dashStr += x;
	}

	return dashStr
}