// eslint-disable-next-line no-unused-vars
import React from "preact";
/**
 *
 * @param {String[]} items
 * @param {Number} gap
 * @param {string} direction
 *
 * @description
 * Auto layout utility, allows us to layout things
 * vertically or horizontally with proper gaping
 */
export default function FlexLayout({ items, gap, direction }) {
  // filter() for filtering out empty strings
  return items.filter(Boolean).map((item, i) => {
    let transform = `translate(${gap * i}, 0)`;
    if (direction === "column") {
      transform = `translate(0, ${gap * i})`;
    }
    return <g transform={transform}>{item}</g>;
  });
}
