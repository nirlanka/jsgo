import { test, expect } from "bun:test";

import { Tag } from "./";

test("Tag creates a div", () => {
  const div = Tag("div", { className: "test1" });
  
  expect(div).toBeTruthy();
  expect(div?.className).toBe("test1");
});

test("Tag creates a div with children", () => {
  const div = Tag("div", {
    children: [
      Tag("span"),
      Tag("img"),
    ]
  });
  
  expect(div).toBeTruthy();
  expect(div?.children.length).toEqual(2);
  expect(div?.children[0].tagName).toEqual("SPAN");
  expect(div?.children[1].tagName).toEqual("IMG");
});

//// TODO: Add other tests