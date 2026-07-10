const wheel = document.getElementById("wheel");

const spinButton = document.getElementById("spinButton");

const result = document.getElementById("result");

const prizes = [

    "2000円",

    "3000円",

    "4000円",

    "10000円"

];

let played = false;

let rotation = 0;

spinButton.addEventListener("click",()=>{

    if(played) return;

    played = true;

    spinButton.disabled = true;

    const index = Math.floor(Math.random()*4);

    // ▼の位置(真上)に止める

    const targetAngle = index * 90;

    rotation += 360 * 5 + (360 - targetAngle);

    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(()=>{

        result.innerHTML = `

            🎉 当選！<br>

            <span style="font-size:48px;">

                ${prizes[index]}

            </span>

        `;

    },4000);

});
