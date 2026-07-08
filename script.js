const canvas = document.getElementById("wheel");

const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spin");

const result = document.getElementById("result");

const jackpot = document.getElementById("jackpot");

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

let angle = 0;

let played = false;

// ルーレット描画

function drawWheel(){

    const radius = canvas.width / 2;

    const arc = Math.PI * 2 / prizes.length;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<prizes.length;i++){

        ctx.beginPath();

        ctx.moveTo(radius,radius);

        ctx.arc(

            radius,

            radius,

            radius-5,

            i*arc,

            (i+1)*arc

        );

        ctx.closePath();

        ctx.fillStyle = colors[i];

        ctx.fill();

        ctx.save();

        ctx.translate(radius,radius);

        ctx.rotate(i*arc+arc/2);

        ctx.fillStyle="white";

        ctx.font="bold 24px sans-serif";

        ctx.textAlign="right";

        ctx.fillText(

            prizes[i],

            radius-30,

            10

        );

        ctx.restore();

    }

}

drawWheel();

// ボタン

spinBtn.onclick=()=>{

    if(played)return;

    played=true;

    spinBtn.disabled=true;

    const index=

    Math.floor(

        Math.random()*4

    );

    const arc=360/4;

    const stop=

    360*6+

    (360-index*arc-arc/2);

    angle+=stop;

    canvas.style.transform=

    `rotate(${angle}deg)`;

    setTimeout(()=>{

        result.innerHTML=

        `<h2>🎉 当選 🎉</h2>

        <h1>${prizes[index]}</h1>`;

        if(prizes[index]==="10000円"){

            jackpot.classList.add("show");

            if(navigator.vibrate){

                navigator.vibrate(

                    [300,100,300]

                );

            }

        }

    },6000);

}
