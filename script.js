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

    confetti();

    coinRain();

    playJackpot();

    if(navigator.vibrate){

        navigator.vibrate([300,100,300,100,600]);

    }

}

                   

    },6000);

}
// ===============================

// 第4回 豪華演出

// ===============================

// 紙吹雪

function confetti(){

    for(let i=0;i<120;i++){

        const div=document.createElement("div");

        div.innerHTML="🎊";

        div.style.position="fixed";

        div.style.left=Math.random()*100+"vw";

        div.style.top="-50px";

        div.style.fontSize=

        (18+Math.random()*18)+"px";

        div.style.pointerEvents="none";

        div.style.zIndex="9999";

        document.body.appendChild(div);

        div.animate([

            {

                transform:

                "translateY(0) rotate(0deg)"

            },

            {

                transform:

                `translateY(120vh)

                rotate(${720+Math.random()*720}deg)`

            }

        ],{

            duration:3000,

            easing:"ease-in"

        });

        setTimeout(()=>{

            div.remove();

        },3000);

    }

}

// 金貨

function coinRain(){

    for(let i=0;i<60;i++){

        const coin=document.createElement("div");

        coin.innerHTML="🪙";

        coin.style.position="fixed";

        coin.style.left=Math.random()*100+"vw";

        coin.style.top="-40px";

        coin.style.fontSize="32px";

        coin.style.pointerEvents="none";

        coin.style.zIndex="9999";

        document.body.appendChild(coin);

        coin.animate([

            {

                transform:"translateY(0)"

            },

            {

                transform:

                "translateY(120vh)"

            }

        ],{

            duration:2500

        });

        setTimeout(()=>{

            coin.remove();

        },2500);

    }

}

// 効果音

function playJackpot(){

    const ctx=

    new(

    window.AudioContext||

    window.webkitAudioContext

    )();

    const osc=

    ctx.createOscillator();

    const gain=

    ctx.createGain();

    osc.frequency.value=1200;

    osc.type="triangle";

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.start();

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        ctx.currentTime+1

    );

    osc.stop(ctx.currentTime+1);

}
