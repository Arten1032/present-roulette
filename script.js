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
// ==========================================

// 第2回

// 回転・抽選・結果表示

// ==========================================

// 回転用

let currentAngle = 0;

// AudioContext

let audioContext = null;

function getAudio(){

    if(!audioContext){

        audioContext =

        new(window.AudioContext||

        window.webkitAudioContext)();

    }

    return audioContext;

}

// 効果音

function playTone(freq,time){

    const ctx = getAudio();

    const osc = ctx.createOscillator();

    const gain = ctx.createGain();

    osc.type="triangle";

    osc.frequency.value=freq;

    osc.connect(gain);

    gain.connect(ctx.destination);

    gain.gain.value=0.15;

    osc.start();

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        ctx.currentTime+time

    );

    osc.stop(

        ctx.currentTime+time

    );

}

// 重み付き抽選

function lottery(){

    const total =

    weights.reduce((a,b)=>a+b,0);

    let r=Math.random()*total;

    for(let i=0;i<weights.length;i++){

        r-=weights[i];

        if(r<=0){

            return i;

        }

    }

    return 0;

}

// 履歴

function addHistory(text){

    const li=

    document.createElement("li");

    li.textContent=

    new Date().toLocaleTimeString()

    +"　"+text;

    historyList.prepend(li);

}

// ボタン

spinButton.addEventListener("click",async()=>{

    if(spinning)return;

    spinning=true;

    spinButton.disabled=true;

    await getAudio().resume();

    result.innerHTML="";

    playTone(250,.15);

    const index=lottery();

    const prize=prizes[index];

    const section=360/prizes.length;

    const stopAngle=

    360*8+

    (360-(index*section)-section/2);

    currentAngle+=stopAngle;

    canvas.style.transition=

    "transform 6s cubic-bezier(.18,.95,.2,1)";

    canvas.style.transform=

    `rotate(${currentAngle}deg)`;

    if(navigator.vibrate){

        navigator.vibrate(80);

    }

    setTimeout(()=>{

        playTone(

            prize==="10000円"

            ?1100

            :550,

            .35

        );

        result.innerHTML=

        "🎉<br><span style='font-size:42px'>"

        +prize+

        "</span>";

        addHistory(prize);

        spinning=false;

        spinButton.disabled=false;

    },6100);

});
spinButton.onclick = () => alert("クリックされた！");
