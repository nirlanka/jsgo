"use strict";
// @ts-check

import { assert } from "./_assert.js";

export class type {
	constructor(_) {
		let subtype = this.constructor;
		assert.type.dict(_);
		subtype.assert(_);

		//// Assign object keys
		Object.assign(this, _);

		//// Run asserts
		assert.type.function(subtype.assert, 
			"subtype " + subtype.name + 
			" should have `static assert(~)`");
	}
}
