// ==========================================

// プレゼントルーレット

// script.js

// 第3回-①

// ==========================================

const canvas = document.getElementById("wheel");

const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spinButton");

const result = document.getElementById("result");

const items = [

    { text: "2000円", color: "#2196F3" },

    { text: "3000円", color: "#4CAF50" },

    { text: "4000円", color: "#F44336" },

    { text: "10000円", color: "#FFD700" }

];

const centerX = canvas.width / 2;

const centerY = canvas.height / 2;

const radius = 190;

let rotation = 0;

let spinning = false;

// =======================

// ルーレット描画

// =======================

function drawWheel(angle = 0){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();

    ctx.translate(centerX,centerY);

    ctx.rotate(angle);

    const slice =

    Math.PI*2/items.length;

    for(let i=0;i<items.length;i++){

        const start =

        i*slice-Math.PI/2;

        const end =

        start+slice;

        ctx.beginPath();

        ctx.moveTo(0,0);

        ctx.arc(

            0,

            0,

            radius,

            start,

            end

        );

        ctx.closePath();

        ctx.fillStyle=

        items[i].color;

        ctx.fill();

        ctx.save();

        ctx.rotate(

            start+slice/2

        );

        ctx.textAlign="right";

        ctx.fillStyle=

        items[i].text==="10000円"

        ?"#000"

        :"#fff";

        ctx.font=

        "bold 24px sans-serif";

        ctx.fillText(

            items[i].text,

            radius-25,

            8

        );

        ctx.restore();

    }

    ctx.restore();

}

drawWheel();

// =======================

// 回転

// =======================

spinButton.onclick=()=>{

    if(spinning)return;

    spinning=true;

    spinButton.disabled=true;

    const target =

    Math.floor(

        Math.random()*4

    );

    const degree =

    360*6+

    target*90;

    rotation+=degree;

    canvas.style.transition=

    "transform 5s cubic-bezier(.18,.9,.2,1)";

    canvas.style.transform=

    `rotate(${rotation}deg)`;

    setTimeout(()=>{

        const finalAngle = ((rotation % 360) + 360) % 360;

// 矢印は真上(270°)なので補正

const pointer = (360 - finalAngle + 270) % 360;

// 0～89:2000円

// 90～179:3000円

// 180～269:4000円

// 270～359:10000円

let prize = "";

if(pointer < 90){

    prize = "2000円";

}else if(pointer < 180){

    prize = "3000円";

}else if(pointer < 270){

    prize = "4000円";

}else{

    prize = "10000円";

}

result.innerHTML = `

<h2>🎉 当選 🎉</h2>

<h1>${prize}</h1>

`;

if(prize === "10000円"){

    result.innerHTML += `

    <div style="

    color:gold;

    font-size:34px;

    margin-top:15px;

    text-shadow:0 0 15px gold;

    ">

    ✨JACKPOT!!✨

    </div>

    `;

    if(navigator.vibrate){

        navigator.vibrate([300,100,300]);

    }

}

spinning = false;

    },5000);

};
