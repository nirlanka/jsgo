"use strict";
// @ts-check

import { assert } from "./_assert.js";
import { type } from "./_type.js";

let shouldDebugPrint = true;
export let setDebugPrint = (printOrNot) => {
	shouldDebugPrint = !!printOrNot;
}

/** Not null or undefined */
export let exists = (v) => v !== null && v !== undefined;

/** Simple wrapper for syntax clarity (to enforce parens deleted by formatting) */
export let expr = (v) => v;

/** Print log and return last arg */
export let debug = (...args) => (
	(shouldDebugPrint ? console.log : ()=>{})(...args), 
	args[args.length - 1]);

class __i_var_ref__ extends type {
	static assert({ _value }) {
		assert.exists(_value);
	}

	value = () => this._value;
}

export let Ref = (v) => new __i_var_ref__({ _value: v});