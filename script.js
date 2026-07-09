// ==========================================

// プレゼントルーレット

// script.js

// 完成版 第1回

// ==========================================

const canvas = document.getElementById("wheel");

const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spinButton");

const result = document.getElementById("result");

const prizes = [

    "2000円",

    "3000円",

    "4000円",

    "10000円"

];

const colors = [

    "#2196F3",

    "#4CAF50",

    "#F44336",

    "#FFD700"

];

const radius = 190;

const center = 200;

let currentRotation = 0;

let played = false;

// =======================

// ルーレット描画

// =======================

function drawWheel(){

    ctx.clearRect(0,0,400,400);

    const arc = Math.PI * 2 / 4;

    for(let i=0;i<4;i++){

        ctx.beginPath();

        ctx.moveTo(center,center);

        ctx.arc(

            center,

            center,

            radius,

            i*arc-Math.PI/2,

            (i+1)*arc-Math.PI/2

        );

        ctx.closePath();

        ctx.fillStyle = colors[i];

        ctx.fill();

        ctx.save();

        ctx.translate(center,center);

        ctx.rotate(i*arc+arc/2-Math.PI/2);

        ctx.textAlign="right";

        ctx.font="bold 24px sans-serif";

        ctx.fillStyle =

        i===3 ? "#000" : "#fff";

        ctx.fillText(

            prizes[i],

            radius-25,

            8

        );

        ctx.restore();

    }

}

drawWheel();
// =======================

// 回転

// =======================

spinButton.addEventListener("click",()=>{

    if(played)return;

    played=true;

    spinButton.disabled=true;

    // ランダムに止まる位置

    const target =

    Math.floor(Math.random()*4);

    // 6回転＋目的位置

    const stopAngle =

    360*6+

    (360-(target*90)-45);

    currentRotation += stopAngle;

    canvas.style.transition =

    "transform 5s cubic-bezier(.18,.9,.2,1)";

    canvas.style.transform =

    `rotate(${currentRotation}deg)`;

    setTimeout(()=>{

        // 今止まった角度を取得

        const angle =

        ((currentRotation % 360)+360)%360;

        // 矢印(真上)が指す場所を計算

        const pointer =

        (360-angle+45)%360;

        let index =

        Math.floor(pointer/90);

        const prize =

        prizes[index];

        result.innerHTML = `

        <h2>🎉 当選 🎉</h2>

        <h1>${prize}</h1>

        `;

        // 第3回で10000円演出を追加

    },5000);

});
