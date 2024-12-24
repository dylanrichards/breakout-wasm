console.log("loaded breakout.js");

import * as d from "./lib/drawing.js";

const canvas = /** @type {HTMLCanvasElement} */
    (document.getElementById("canvas"));

const ctx = /** @type {CanvasRenderingContext2D} */
    (canvas.getContext("2d"));

const canvasRect = d.createRectangle(0, 0, canvas.width, canvas.height);

let paddle = d.createRectangle(50, 700, 100, 25);
fillRect(paddle);

const paddleSpeed = 10;
const canvasPadding = 15;

let ball = d.createCircle(100, 100, 10);
let dx = 2;
let dy = -2;

function animate(){
    clearRect(canvasRect);

    drawCircle(ball);
    fillRect(paddle);

    if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius)
    {
        dx = -dx;
    }

    if (ball.y + dy > canvas.height - ball.radius || ball.y + dy < ball.radius)
    {
        dy = -dy;
    }

    // paddle collision - change dx if it's on one half of the x paddle vs the other half
    if (ball.x + dx >= paddle.x - ball.radius && ball.x + dx <= paddle.x + paddle.w - ball.radius)
    {
        if (ball.y + dy >= paddle.y - ball.radius && ball.y + dy <= paddle.y + paddle.h - ball.radius)
            dy = -dy;
    }


    ball.x += dx;
    ball.y += dy;

    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

/**
 * @param c {d.Circle}
 */
function drawCircle(c)
{
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI)
    ctx.fill();
    ctx.closePath();
}


/**
 * @param r {d.Rectangle}
 */
function fillRect(r)
{
    ctx.fillRect(r.x, r.y, r.w, r.h);
}

/**
 * @param r {d.Rectangle}
 */
function clearRect(r)
{
    ctx.clearRect(r.x, r.y, r.w, r.h);
}


function onArrowRight() {
    if (paddle.x + paddle.w <= canvas.width - canvasPadding)
    {
        clearRect(paddle);
        paddle.x += paddleSpeed;
        fillRect(paddle);
    }
}

function onArrowLeft() {
    if (paddle.x > canvasPadding)
    {
        clearRect(paddle);
        paddle.x -= paddleSpeed;
        fillRect(paddle);
    }
}

function onArrowUp() {
    if (paddle.y > canvasPadding)
    {
        clearRect(paddle);
        paddle.y -= paddleSpeed;
        fillRect(paddle);
    }
}

function onArrowDown() {
    if (paddle.y + paddle.h <= canvas.height - canvasPadding)
    {
        clearRect(paddle);
        paddle.y += paddleSpeed;
        fillRect(paddle);
    }
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
        {
            clearRect(paddle);
            paddle.x = event.clientX;
            fillRect(paddle);
        }
    });
}
registerKeyEvent();
registerMouseMove();
