// ==========================================

// LINE CASINO ROULETTE

// script.js

// 第1回

// ==========================================

// ---------- Canvas ----------

const canvas = document.getElementById("roulette");

const ctx = canvas.getContext("2d");

// ---------- ボタン ----------

const spinButton = document.getElementById("spinButton");

// ---------- 結果 ----------

const result = document.getElementById("result");

// ---------- 履歴 ----------

const historyList = document.getElementById("historyList");

// ---------- 演出 ----------

const flash = document.getElementById("flash");

const jackpot = document.getElementById("jackpot");

// ---------- 景品 ----------

const prizes = [

    "100円",

    "500円",

    "1000円",

    "2000円",

    "5000円",

    "10000円",

    "もう一回",

    "ハズレ"

];

// ---------- 色 ----------

const colors = [

    "#ff3b30",

    "#007aff",

    "#34c759",

    "#ffd60a",

    "#ff2d55",

    "#5ac8fa",

    "#30d158",

    "#bf5af2"

];

// ---------- 確率 ----------

const weights = [

    30,

    20,

    15,

    10,

    5,

    1,

    10,

    9

];

// ---------- 状態 ----------

let rotation = 0;

let spinning = false;

// ==========================================

// Canvas描画

// ==========================================

function drawWheel(){

    const total = prizes.length;

    const arc = Math.PI * 2 / total;

    const radius = canvas.width / 2;

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    for(let i=0;i<total;i++){

        const start =

        arc * i;

        const end =

        start + arc;

        ctx.beginPath();

        ctx.moveTo(

            radius,

            radius

        );

        ctx.arc(

            radius,

            radius,

            radius-8,

            start,

            end

        );

        ctx.closePath();

        ctx.fillStyle =

        colors[i];

        ctx.fill();

        // 景品文字

        ctx.save();

        ctx.translate(

            radius,

            radius

        );

        ctx.rotate(

            start + arc/2

        );

        ctx.fillStyle =

        "white";

        ctx.font =

        "bold 18px sans-serif";

        ctx.textAlign =

        "right";

        ctx.fillText(

            prizes[i],

            radius-25,

            8

        );

        ctx.restore();

    }

}

// 初回描画

drawWheel();
