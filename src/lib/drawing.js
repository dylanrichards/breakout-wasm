console.log("drawing.js");

/** @typedef Circle
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} radius
 */

/**
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @returns {Circle}
 */
export function createCircle(x, y, r)
{
    return {
        x: x,
        y: y,
        radius: r,
    }
}

/** @typedef Rectangle
 * @type {object}
 * @property x {number}
 * @property y {number}
 * @property w {number}
 * @property h {number}
 */

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @returns {Rectangle}
 */
export function createRectangle(x, y, w, h)
{
    return {
        x: x,
        y: y,
        w: w,
        h: h,
    }
}
