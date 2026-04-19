"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { enumerate } from "./";

test("enumerate should create { key:key } from dict", () => {
	let USER_ROLE_ENUM = enumerate({
		CUSTOMER: null,
		ADMIN: null,
	})
})