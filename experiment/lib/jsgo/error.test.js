"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { flattenErrorSync, flattenErrorAsync } from "./";

test("flattenErrorSync should return { error } when thrown", () => {
	let { error } = flattenErrorSync(() => { throw new Error("err1") });
	expect(error).toEqual(new Error("err1"))
})

test("flattenErrorSync should return { _ } when not thrown", () => {
	let { _: val1 } = flattenErrorSync(() => 123);
	expect(val1).toEqual(123);
})

test("flattenErrorAsync should return { error } when thrown", async () => {
	let { error } = await flattenErrorAsync(() => { throw new Error("err1") });
	expect(error).toEqual(new Error("err1"))
})

test("flattenErrorAsync should return { _ } when not thrown", async () => {
	let { _: val1 } = await flattenErrorAsync(() => 123);
	expect(val1).toEqual(123);
})