"use strict";
// @ts-check

export let flattenErrorSync = (fn) => {
	let _;

	try {
		_ = fn();
	} catch (error) {
		return { error };
	}

	return { _ };
}

export let flattenErrorAsync = async (fn) => {
	let _;

	try {
		_ = await fn();
	} catch (error) {
		return { error };
	}

	return { _ };
}