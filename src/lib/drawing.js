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

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param c {Circle}
 */
export function drawCircle(ctx, c)
{
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI)
    ctx.fill();
    ctx.closePath();
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


/**
 * @param {CanvasRenderingContext2D} ctx
 * @param r {Rectangle}
 */
export function drawRect(ctx, r)
{
    ctx.fillRect(r.x, r.y, r.w, r.h);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param r {Rectangle}
 */
export function clearRect(ctx, r)
{
    ctx.clearRect(r.x, r.y, r.w, r.h);
}

