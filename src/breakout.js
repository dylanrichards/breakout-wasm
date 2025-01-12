console.log("loaded breakout.js");

import * as d from "./lib/drawing.js";
import * as c from "./lib/collision/collision.js";

const collision = await c.loadCollisionWasm();

console.info(collision.add(3, 19));

const canvas = /** @type {HTMLCanvasElement} */
    (document.getElementById("canvas"));

const ctx = /** @type {CanvasRenderingContext2D} */
    (canvas.getContext("2d"));

let canvasRect = d.createRectangle(0, 0, canvas.width, canvas.height);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    d.clearRect(ctx, canvasRect);
    canvasRect = d.createRectangle(0, 0, canvas.width, canvas.height);
    console.debug("Canvas size: " + canvas.width + ", " + canvas.height);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

let paddle = d.createRectangle(canvas.width / 2, canvas.height * 4 / 5, 100, 25);
d.drawRect(ctx, paddle);

const paddleSpeed = 10;

/** @type {number} */
let dx;
/** @type {number} */
let dy;
/** @type {d.Circle} */
let ball;
/** @type {d.Rectangle[]} */
let bricks;

function initGame() {
    ball = d.createCircle(canvas.width / 2, canvas.height / 3, 10);
    bricks = createBricks(5, 15);
    dx = 3;
    dy = -5;
}

initGame();
window.requestAnimationFrame(animate);

/**
 * @param {number} layers
 * @param {number} bpl bricks per layer
 * @returns {d.Rectangle[]} bricks
 */
function createBricks(layers, bpl) {
    const ret = [];
    const xpad = 5;
    const ypad = 5;

    const h = 20;
    const w = (canvas.width / bpl) - 5;
    let x = 0;
    let y = 10;
    for (let i = 0; i < layers; i++) {
        for (let j = 0; j < bpl; j++) {
            ret.push(d.createRectangle(x, y, w, h));
            x += w + xpad;
        }
        x = 0;
        y += h + ypad;
    }
    return ret;
}

function animate(){
    d.clearRect(ctx, canvasRect);
    d.drawCircle(ctx, ball);
    d.drawRect(ctx, paddle);
    bricks.forEach(b => d.drawRect(ctx, b));

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width)
    {
        dx = -dx;
    }

    if (ball.y - ball.radius < 0)
    {
        dy = -dy;
    }

    if (ball.y > canvas.height - ball.radius)
    {
        alert("YOU LOST");
        initGame();
    }

    //bricks = bricks.filter((b) => !hasCollided(ball, b));
    for (let i = 0; i < bricks.length; i++) {
        if (hasCollided(ball, bricks[i])) {
            bricks.splice(i, 1);
            dy = -dy;
            break;
        }
    }

    if (bricks.length == 0) {
        alert("YOU WIN!");
        initGame();
    }

    // paddle collision
    if (hasCollided(ball, paddle))
    {
        dx = calcDx(ball, paddle);
        dy = -dy;
    }

    ball.x += dx;
    ball.y += dy;

    window.requestAnimationFrame(animate);
}

/**
 * Calc dx
 * @param {d.Circle} circle
 * @param {d.Rectangle} rect
 * @returns {number}
 */
function calcDx(circle, rect) {
    const halfW = rect.w / 2;
    // close enough to the rang -1 to 1 where 0 is the midpoint
    const scale = (circle.x - rect.x - halfW)/halfW;
    return scale * 3;
}

/**
 * @param {d.Circle} circle
 * @param {d.Rectangle} rect
 */
function hasCollided(circle, rect) {
    if (circle.x + circle.radius >= rect.x && circle.x - circle.radius <= rect.x + rect.w)
    {
        if (circle.y + circle.radius >= rect.y && circle.y - circle.radius <= rect.y + rect.h)
            return true;
    }
    return false;
}

function onArrowRight() {
    if (paddle.x + paddle.w <= canvas.width)
        paddle.x += paddleSpeed;
}

function onArrowLeft() {
    if (paddle.x > 0)
        paddle.x -= paddleSpeed;
}

function onArrowUp() {
    if (paddle.y > 0)
        paddle.y -= paddleSpeed;
}

function onArrowDown() {
    if (paddle.y + paddle.h <= canvas.height)
        paddle.y += paddleSpeed;
}

function registerKeyEvent() {
    document.addEventListener("keydown", (event) => {
        if (event.key == "ArrowRight") {
            onArrowRight();
        } else if (event.key == "ArrowLeft") {
            onArrowLeft();
        } else if (event.key == "ArrowUp") {
            onArrowUp();
        } else if (event.key == "ArrowDown") {
            onArrowDown();
        }
    });
}

/**
 * @param {MouseEvent} event
 */
function updateMousePos(event) {
    if (event.clientX + paddle.w <= canvas.width)
        paddle.x = event.clientX;
}

/**
 * @param {TouchEvent} event
 */
function updateTouchPos(event) {
    const touch = event.touches[0];
    if (touch.clientX + paddle.w <= canvas.width)
        paddle.x = touch.clientX;
}

registerKeyEvent();
document.addEventListener("mousemove", updateMousePos);
document.addEventListener('touchstart', updateTouchPos);
document.addEventListener('touchmove', updateTouchPos);
