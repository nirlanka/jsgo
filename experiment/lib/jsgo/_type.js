"use strict";
// @ts-check

import { assert } from "./_assert.js";

export class type {
	constructor(_) {
		//// Assign object keys
		assert.type.dict(_);
		Object.assign(this, _);

		//// Run asserts
		let subtype = this.constructor;
		assert.type.function(subtype.assert, 
			"subtype " + subtype.name + 
			" should have `static assert(~)`");
		subtype.assert(_);
	}
}
