"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { exists, expr, setDebugPrint, debug, Ref } from "./";

test("exists should fail for null", () => {
	expect(exists(null)).toEqual(false);
})

test("exists should fail for undefined", () => {
	expect(exists(undefined)).toEqual(false);
})

test("exists should be successful for truthy value", () => {
	expect(exists(true)).toEqual(true);
})

test("exists should be successful for falsy value", () => {
	expect(exists(false)).toEqual(true);
})

test("expr should return arg", () => {
	expect(expr(1234)).toEqual(1234);
})

setDebugPrint(false);

test("debug should return last arg", () => {
	expect(debug(1, 2, 3)).toEqual(3);
})

test("Ref should return reference wrapper", () => {
	let r1 = Ref(1);
	expect(r1.value()).toEqual(1);
})