console.log("loaded breakout.js");

import * as d from "./lib/drawing.js";
import * as c from "./lib/collision/collision.js";

const collision = await c.loadCollisionWasm();

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

let paddle = d.createRectangle(50, 700, 100, 25);
d.drawRect(ctx, paddle);

const paddleSpeed = 10;

let ball = d.createCircle(100, 10, 10);
let dx = 2;
let dy = -2;

function animate(){
    d.clearRect(ctx, canvasRect);
    d.drawCircle(ctx, ball);
    d.drawRect(ctx, paddle);

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width)
    {
        dx = -dx;
    }

    if (ball.y - ball.radius < 0 || ball.y > canvas.height - ball.radius)
    {
        dy = -dy;
    }

    // paddle collision - change dx if it's on one half of the x paddle vs the other half
    if (hasCollided(ball, paddle))
    {
        dy = -dy;
    }

    ball.x += dx;
    ball.y += dy;

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

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

function registerMouseMove() {
    document.addEventListener("mousemove", (event) => {
        if (event.clientX + paddle.w <= canvas.width)
            paddle.x = event.clientX;
    });
}
registerKeyEvent();
registerMouseMove();
