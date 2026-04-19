"use strict";
// @ts-check

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