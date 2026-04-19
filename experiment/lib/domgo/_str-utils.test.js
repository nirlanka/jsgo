"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { camelToDash } from "./_str-utils.js";

test("camelToDash should be correct for non-camel-case strings", () => {
	expect(camelToDash("str1")).toEqual("str1");
})

test("camelToDash should be correct for camel-case strings", () => {
	expect(camelToDash("strVal1")).toEqual("str-val1");
})