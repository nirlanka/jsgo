"use strict";
// @ts-check

import { test, expect } from "bun:test";

import { setAssertThrow, type, assert } from "./";

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

test("type composition should be successful for assert pass", () => {
	class t_user_info extends type {
		static assert({ name, email }) {
			assert.type.string(name);
			assert.type.string(email);
		}
	}

	class t_job extends type {
		static assert({ company, position }) {
			assert.type.string(company);
			assert.type.string(position);
		}
	} 

	class t_resume extends type {
		static assert(_) {
			t_user_info.assert(_);
			t_job.assert(_);
		}
	}

	expect(new t_resume({
		name: "John",
		email: "j@doe.com",

		company: "Comp1",
		position: "CEO",
	})).toEqual({
		name: "John",
		email: "j@doe.com",

		company: "Comp1",
		position: "CEO",
	})
})

test("type interfacing should be successful for assert pass", async () => {
	class i_user_auth extends type {
		static assert({
			login,
			logout,
		}) {
			assert.type.function(login);
			assert.type.function(logout);
		}
	}

	let adminAuthService = new class {
		login= async (userid, password) => Promise.resolve({ token: "abc123" })
		logout= async (userid) => Promise.resolve({ token: 0 })
	} ();
	i_user_auth.assert(adminAuthService);

	let t1 = await adminAuthService.login("u1", "p");
	expect(t1?.token).toEqual("abc123");
})