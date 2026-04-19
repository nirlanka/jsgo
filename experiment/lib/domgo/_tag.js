"use strict";
// @ts-check

import { camelToDash } from "./_str-utils.js";

let idx = 0;

export let Tag = (tagName, props = {}) => {
	let _;

	let { 
		className,
		style,
		styleBefore,
		styleAfter,

		textContent,
		innerHtml,
		children,

		attributes,
	} = props;

	//// Event handlers with format example: `onClick`
	let eventHandlerKeys = Object.keys(props)
		.filter(k => 
			k.startsWith("on") && 
			k.charAt(2).toUpperCase() === k.charAt(2));

	let el = document.createElement(tagName);

	Object.assign(el, {
		className,
		style,
		textContent,
		innerHtml,
	});

	_ = el;
	if (styleBefore || styleAfter) {
		idx++;
		_ = document.createElement("span");
		_.className = "domgo-tag-wrapper--id-" + idx;

		let styleMapList = [];
		if (styleBefore) styleMapList.push([styleBefore, "before"]);
		if (styleAfter) styleMapList.push([styleAfter, "after"]);

		for (let [styleMap, keyword] of styleMapList) {
			let styles = /*css*/``;
			for (let s of styleMap) {
				let key = camelToDash(s);
				style += /*css*/`\n${key}: ${styleMap[s]};`;
			}

			let stylesheet = document.createElement("style");
			stylesheet.insertRule(/*css*/`
				.domgo-tag-wrapper--id-${idx} > *::${keyword} { ${styles} }
			`)
		}
	}

	if (children)
		for (let ch of children)
			if (ch) el.appendChild(ch);

	if (attributes)
		for (let k of attributes)
			el.setAttribute(k, attributes[k]);

	return _;
}