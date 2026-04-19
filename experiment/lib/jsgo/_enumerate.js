"use strict";
// @ts-check

import { type, assert } from "./";

class _enum_dict extends type {
	static assert(_) {
		for (let k in _) {
			assert.type.string(_[k]);
			assert(() => k === _[k]);
		}
	}
}

/**
 * @param {Object} dict
 * @returns {Object} enum-like in format { key:"key" }
 */
export let enumerate = (defn) => {
	let keys = [];

	if (Array.isArray(defn))
		keys = [ ...defn ];
	else
		keys = Object.keys(defn);

	let _ = {};

	for (let k of keys) {
		_[k] = k;
	}

	return new _enum_dict(_);
}