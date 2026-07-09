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

let angle = 0;

let played = false;

// =====================

// 描画

// =====================

function drawWheel(){

    ctx.clearRect(0,0,400,400);

    ctx.save();

    ctx.translate(center,center);

    ctx.rotate(angle*Math.PI/180);

    const arc=Math.PI*2/4;

    for(let i=0;i<4;i++){

        ctx.beginPath();

        ctx.moveTo(0,0);

        ctx.arc(

            0,

            0,

            radius,

            i*arc-Math.PI/2,

            (i+1)*arc-Math.PI/2

        );

        ctx.closePath();

        ctx.fillStyle=colors[i];

        ctx.fill();

        ctx.save();

        ctx.rotate(i*arc+arc/2-Math.PI/2);

        ctx.textAlign="right";

        ctx.fillStyle=

        i===3?"#000":"#fff";

        ctx.font="bold 24px sans-serif";

        ctx.fillText(

            prizes[i],

            radius-25,

            8

        );

        ctx.restore();

    }

    ctx.restore();

}

drawWheel();

spinButton.onclick=()=>{

    if(played)return;

    played=true;

    spinButton.disabled=true;

    const index = Math.floor(Math.random()*4);

const stop = 360 * 6 + (420 - index * 90);

angle += stop;

canvas.style.transform =

`rotate(${angle}deg)`;

    setTimeout(()=>{
        const prize = prizes[index];

        result.innerHTML = `

        <h2 style="color:white;">

        🎉 当選 🎉

        </h2>

        <h1 style="

        font-size:52px;

        color:${prize==="10000円"?"gold":"white"};

        text-shadow:

        ${prize==="10000円"

            ?"0 0 10px yellow,0 0 30px gold,0 0 60px orange"

            :"0 0 10px #00ff88"};

        ">

        ${prize}

        </h1>

        `;

        if(prize==="10000円"){

            document.body.animate([

                {filter:"brightness(1)"},

                {filter:"brightness(2)"},

                {filter:"brightness(1)"}

            ],{

                duration:700

            });

            for(let i=0;i<100;i++){

                const c=document.createElement("div");

                c.innerHTML=Math.random()>0.5?"🎊":"🪙";

                c.style.position="fixed";

                c.style.left=Math.random()*100+"vw";

                c.style.top="-30px";

                c.style.fontSize=

                (18+Math.random()*22)+"px";

                c.style.pointerEvents="none";

                c.style.zIndex="9999";

                document.body.appendChild(c);

                c.animate([

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

                    c.remove();

                },3000);

            }

            result.innerHTML+=`

            <div style="

            color:gold;

            font-size:28px;

            margin-top:15px;

            text-shadow:

            0 0 10px yellow,

            0 0 30px gold;

            ">

            ✨ JACKPOT!! ✨

            </div>

            `;

            if(navigator.vibrate){

                navigator.vibrate([300,100,300,100,600]);

            }

        }
spinning = false;
    },5000);

};
