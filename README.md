JsGo - PureJS with style
========================

## Some preferences

1. Always use `null` (instead of `undefined`)
2. Always use `let` (instead of `var`, `const`, and `function`)
3. Always use custom-type (class) composition (instead of extending custom-types)
4. Always use camelCase for variables and function names
5. Always use t_snake_case for custom-types
6. Always Use golang-like error+value return types (instead of throwing exceptions)
7. Always add asserts (non-throwing) to validate function arguments
8. Use jsdoc type definitions where possible
9. Prefer explicit string interpolation instead of backticks
10. Always use `////` instead of `//` for actual comments (to differentiate from commented-out code)

## Some recommendations

1. Liberal use of scope-brackets
2. `"use strict";` and `// @ts-check`

## Custom-types

Ideas:
1. Don't extend custom-types again (instead use composition - TODO: Define examples)
2. Don't define default fields outside constructor

```js
import { t_type } from "lib/type.js";
import { assert } from "lib/assert.js";

import { exists } from "lib/syntax.js";
import { emailRegex } from "./validation-regex.js";

export class t_user_info extends t_type {
	static assert({
		firstName,
		lastName,
		middleName,

		emailAddress,
	}) {
		assert.string(firstName);
		assert.string(lastName);
		if (exists(middleName)) assert.string(middleName);

		assert(() => emailRegex.test(emailAddress));
	}
}
```

This code extends and sends own type to `super(~)` so that the assert can be referenced when creating an object.

```js
import { t_user_info } from "./api-models.js";

export let getDummyUser = () => {
	return new t_user_info({
		firstName: "John",
		lastName: "Doe",

		middleName: 123, //// <-- cause assert error
	})
}
```

Above example will cause a devtools console to show an `[ASSERT FAILURE]` error with the assert information. (Doesn't throw).

## Compositing custom-types

```js
import { t_type } from "../lib/type.js";

export class t_user_job extends t_type {
	static assert({
		companyName,
		jobPosition,
	}) {
		assert.string(companyName);
		assert.string(jobPosition);
	}
}
```

Implicit composition:
```js
/**
 * t_user_info | t_user_job
 */
export class t_user_resume_1 extends t_type {
	static assert(_) {
		t_user_info.assert(_);
		t_user_job.assert(_);
	}
}
```

Explicit composition:
```js
/**
 * @property {t_user_info} user
 * @property {t_user_job} job
 */
export class t_user_resume_2 extends t_type {
	static assert({user, job}) {
		t_user_info.assert(user);
		t_user_job.assert(job);
	}
}
```

## Error handling

```js
import { t_user_info } from "./api-models.js";
import { getUserInfo } from "./api.js";

/**
 * @param {number} userId
 * @returns {{ error: Error, _ }}
 */
export let getUserName = async (userId) => {
	assert.number(userId);

	let { error, _: userInfo } = await getUserInfo(userId);
	if (exists(error)) return { error: new Error("API call failed.") };

	let userName = userInfo.firstName + " " + userInfo.lastName;
	return { _: userName };
}
```

The exception throwing functions can be flattened to match the above model (asynchronous):
```js
import { wrapError  } from "../lib/syntax.js";

import { t_user_info} from "./api-models.js";

/**
 * @returns {{ error: Error, _: t_user_info }}
 */
export let getUserInfo = async (userId) => {
	assert.number(userId);

	let { error: _1, _: resp } = await wrapError.async(fetch("/userinfo"));
	if (exists(error)) return { error: "API call failed." };
	let { error: _2, _ } = await wrapError.async(resp.json());

	return { _ };
}
```

For synchronous throws:
```js
import { wrapError } from "../lib/syntax.js"

let DEFAULT_CONFIG = /*json*/`{
	"theme": "dark"
}`;

/**
 * @returns {{ error: Error, _: Object }}
 */
export let getDefaultConfig = () => {
	let { error, _ } = wrapError.sync(JSON.parse(DEFAULT_CONFIG));
	//// NOTE: `wrapError(~)` without `.async(~)` or `.sync(~)` is invalid.

	if (exists(error)) return { error: new Error("Invalid config hard-coded") };

	return { _ };
}
```

## Dom components

```js
import { BaseComponent, defineWebComponent } from "../lib/web-component.js";
import { Div, Span } from "../lib/dom-aliases.js";

class _Banner extends BaseComponent {
	Dom = () => {
		let { message } = this.props ?? {};
		if (exists(message)) assert.string(message);

		if (!exists(message)) return Div();

		return Div({
			children: [
				Span({ textContent: "NOTICE! " }),
				Span({ textContent: message }),
			]
		});
	}
}

export let Banner = defineWebComponent(_Banner);
//// Banner() === <x-banner-0 />
//// 	where `x-` is the default prefix and
////	`-0` is the counter for similar named components (to avoid collision)
```

or, simply,
```js
export let Banner = defineWebComponent(class _Banner extends BaseComponent) {
	//// ...
}
```

`dom-aliases.js` supports some common DOM elements, and for others, use the generic function:
```js
import { Element } from "../lib/dom.js";

let Div = Element("div");
let div1 = Div();
```

Event-handlers, inline-styles, attributes:
```js
import { Button } from "../lib/dom-aliases.js";

let btn1 = Button({
	className: "btn--default",

	style: {
		color: "white",
		backgroundColor: "blue",
	},
	styleBefore: { content: "" },
	styleAfter: { content: "" },

	onClick: (ev) => { console.log(ev?.target); },
	//// ... on<event_name>

	textContent: "Test",
	innerHtml: "<div>Test1</div>", //// overrides `textContent`
	children: [ Div({ textContent: "Test3" }) ], //// overrides `innerHtml`

	//// Element attributes:
	attributes: {
		someAttr1: "someAttrVal1",
	},
});
```

These `Dom()` calls in web-components and `/dom.js` alias calls do not do any diffs and simply replace its previous items.
For heavy elements or components, you can store them in the component for re-use:

```js
class _Banner extends BaseComponent {
	Dom = () => Div({
		children: [
			(this._cachedIcon = 
				this._cachedIcon ?? 
				Image({ src: "./info.png" })),

			//// ....
		]
	})
}
```

## Interfaces

```js
class i_count_ref extends t_type {
	
}
```

## Function Overloading

TBA

## Object/Variable References

```js
let countRef = {}
```

## Testing component UIs

TODO

## Testing functions (independent unit-tests)

TODO

## x
























# jsgo
