"use strict";
// @ts-check

/**
 * @param {Function} fn
 * @returns {{ error: Error, _: any }}
 */
export let flattenErrorSync = (fn) => {
	let _;

	try {
		_ = fn();
	} catch (error) {
		return { error };
	}

	return { _ };
}

/**
 * @async
 * @param {Function} fn
 * @returns {{ error: Error, _: any }}
 */
export let flattenErrorAsync = async (fn) => {
	let _;

	try {
		_ = await fn();
	} catch (error) {
		return { error };
	}

	return { _ };
}