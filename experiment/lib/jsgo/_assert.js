"use strict";
// @ts-check

let shouldThrow = false;
export let setAssertThrow = (throwOrNot) => {
	shouldThrow = !!throwOrNot;
}

class AssertError extends Error {
	constructor(m) {
		super(m);
	}
}

/**
 * @param {Function} fn
 * @param {String} [m] message
 * @returns {boolean} true if assert passed, otherwise false
 */
export let assert = (fn, m = "") => {
	let error, result;

	if (shouldThrow) {
		result = fn();

		if (!result) {
			throw new AssertError("[ASSERT FAIL] assert() --> false, " + m);
			return false;
		}

		return true;
	}

	try {
		result = fn();

		if (!result) {
			console.error("[ASSERT FAIL]", "assert() --> false,", m);
			return false;
		}

	} catch (err) {
		console.error("[ASSERT FAIL]", m + ",", err);
		return false;
	}

	return true;
}

/**
 * @param {any} v value
 * @param {String} t typeof string
 * @param {String} [m] message
 * @returns {boolean}
 */
assert.typeof = (v, t, m) => assert(() => typeof v === t, m);
/**
 * @param {object} v value
 * @param {Function} klass className
 * @param {String} [m] message
 * @returns {boolean}
 */
assert.instanceof = (v, klass, m) => assert(() => v instanceof klass, m);

assert.type = {};
assert.type.function = (v, m) => assert(() => typeof v === "function", m);
assert.type.string = (v, m) => assert(() => typeof v === "string", m);
assert.type.number = (v, m) => assert(() => typeof v === "number", m);
assert.type.boolean = (v, m) => assert(() => typeof v === "boolean", m);
assert.type.array = (v, m) => assert(() => Array.isArray(v), m);
assert.type.object = (v, m) => assert(() => typeof v === "object", v);
assert.type.dict = (v, m) => assert(() => 
	typeof v === "object" && 
	!Array.isArray(v), m);
assert.type.class = (v, m) => assert(() => 
	typeof v === 'function' && 
	/^\s*class\s+/.test(v.toString()), m);

assert.null = (v, m) => assert(() => v === null, m);
assert.undefined = (v, m) => assert(() => v === undefined, m);
assert.nan = (v, m) => assert(() => Number.isNaN(v), m);

assert.exists = (v, m) => assert(() => v !== null && v !== undefined, m);

assert.true = (v, m) => assert(() => v === true, m);
assert.truthy = (v, m) => assert(() => !!v === true, m);
assert.false = (v, m) => assert(() => v === false, m);
assert.falsy = (v, m) => assert(() => !!v === false, m);

