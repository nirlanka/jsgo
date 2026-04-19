"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { setAssertThrow, type, assert } from "./index.js";

setAssertThrow(true);

test("type creation should fail for assert failure", () => {
	class t_user_info extends type {
		static assert({ name, email }) {
			assert.type.string(name);
			assert.type.string(email);
		}
	}

	expect(() => new t_user_info({
		name: 123,
		email: "",
	})).toThrow();
})

test("type creation should be successful for assert pass", () => {
	class t_user_info extends type {
		static assert({ name, email }) {
			assert.type.string(name);
			assert.type.string(email);
		}
	}

	let u1 = new t_user_info({
		name: "123",
		email: "",
	});

	expect(u1).toBeInstanceOf(t_user_info);
	expect(u1).toEqual({
		name: "123",
		email: "",
	});
})