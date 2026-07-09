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

       const prizes = ["2000円","3000円","4000円","10000円"];

const prize = prizes[target];

result.innerHTML = `

<h2>🎉 当選 🎉</h2>

<h1>${prize}</h1>

`;

if(prize === "10000円"){

    jackpotEffect();

    result.innerHTML = `

    <h2 style="color:gold;">🎉 JACKPOT 🎉</h2>

    <h1 style="

        color:gold;

        font-size:56px;

        text-shadow:

        0 0 10px yellow,

        0 0 30px gold,

        0 0 60px orange;

    ">

    💰10000円💰

    </h1>

    <div style="

        color:gold;

        font-size:28px;

        margin-top:15px;

    ">

    ✨おめでとう！！✨

    </div>

    `;

    if(navigator.vibrate){

        navigator.vibrate([300,100,300,100,600]);

    }

}

spinning = false;

    },5000);

};
// =====================

// JACKPOT演出

// =====================

function jackpotEffect(){

    // 金色フラッシュ

    document.body.animate([

        {filter:"brightness(1)"},

        {filter:"brightness(2)"},

        {filter:"brightness(1)"}

    ],{

        duration:700

    });

    // 紙吹雪

    for(let i=0;i<120;i++){

        const confetti=document.createElement("div");

        confetti.innerHTML="🎊";

        confetti.style.position="fixed";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.top="-30px";

        confetti.style.fontSize=

        (18+Math.random()*20)+"px";

        confetti.style.zIndex="9999";

        confetti.style.pointerEvents="none";

        document.body.appendChild(confetti);

        confetti.animate([

            {

                transform:"translateY(0) rotate(0deg)"

            },

            {

                transform:`translateY(120vh) rotate(${720+Math.random()*720}deg)`

            }

        ],{

            duration:3000,

            easing:"ease-in"

        });

        setTimeout(()=>{

            confetti.remove();

        },3000);

    }

    // 金貨

    for(let i=0;i<50;i++){

        const coin=document.createElement("div");

        coin.innerHTML="🪙";

        coin.style.position="fixed";

        coin.style.left=Math.random()*100+"vw";

        coin.style.top="-40px";

        coin.style.fontSize="34px";

        coin.style.zIndex="9999";

        coin.style.pointerEvents="none";

        document.body.appendChild(coin);

        coin.animate([

            {

                transform:"translateY(0)"

            },

            {

                transform:"translateY(120vh)"

            }

        ],{

            duration:2500

        });

        setTimeout(()=>{

            coin.remove();

        },2500);

    }

}
