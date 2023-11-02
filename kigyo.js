import * as elemek from "./elemek.js";

let KIGYOFEJ = document.querySelector("#kigyofej");
KIGYOFEJ.irany = "ArrowRight";
const JATEKMEZO = document.querySelector("#jatekmezo");
const VEGE = document.querySelector("#vege");
const pont = document.querySelector("#score");
const ELEMNAGYSAG = 50;
const PALYASZELESSEG = JATEKMEZO.clientWidth;
const PALYAMAGASSAG = JATEKMEZO.clientHeight;
const alma = document.createElement("div");
const SEBESSEG = 130;
let fut = false;
let kigyo = [];
let el = false;
let pontok = 0;
let elkezdodott = false;
let helyek = [];
let foroghat = true;

kigyotest();

// kigyótest
function kigyotest(){
    pont.textContent = `pontok: ${pontok}`;
    while(JATEKMEZO.firstChild){
        JATEKMEZO.removeChild(JATEKMEZO.firstChild);
    }
    kigyo = [];
    KIGYOFEJ = document.createElement("div");
    KIGYOFEJ.id = "kigyofej";
    JATEKMEZO.appendChild(KIGYOFEJ);
    KIGYOFEJ.x = 3*ELEMNAGYSAG;
    KIGYOFEJ.y = 0;
    KIGYOFEJ.irany = "ArrowRight";
    KIGYOFEJ.style.backgroundImage = elemek.FEJ_JOBBRA;
    KIGYOFEJ.style.left = KIGYOFEJ.x + "px";
    KIGYOFEJ.style.top = KIGYOFEJ.y + "px";
    kigyo.push(KIGYOFEJ);
    for (let i = 1; i < 4; i++) {
        kigyo.push(document.createElement("div"));
        kigyo[i].className = "testresz";
        JATEKMEZO.appendChild(kigyo[i]);
        kigyo[i].style.backgroundImage = elemek.TEST_VIZSZINTES;
        kigyo[i].x = kigyo[0].x - ELEMNAGYSAG*i;
        kigyo[i].y = kigyo[0].y - ELEMNAGYSAG*i;
        kigyo[i].style.position = "relative";
        kigyo[i].style.backgroundSize = "contain";
        kigyo[i].style.width = ELEMNAGYSAG + "px";
        kigyo[i].style.height = ELEMNAGYSAG + "px";
        kigyo[i].style.left = kigyo[i].x + "px";
        kigyo[i].style.top = kigyo[i].y + "px";
        kigyo[i].irany = "ArrowRight";
    }
    farok();
    random_alma();
    JATEKMEZO.append(alma);
}

document.querySelector("#ujra").onclick = function(){
    elkezdodott = true;
    fut = false;
    el = true;
    pontok = 0;
    kigyotest();
}

// start
elkezdodott = true;
document.getElementById("start").onclick = start;

function start(){
    if (elkezdodott == true){
        elkezdodott = false;
        fut = true;
        el = true;
        window.addEventListener("keydown", iranyvaltozas);
        kovi();
    }
}

// következő "frame"
function kovi(){
    if (fut) {
        setTimeout(() => {
            mozog();
            halal();
            eszik();
            if (el){
                rajzol();
            }
            kovi();
        }, SEBESSEG);
    }
}

const varj = () => new Promise(res => setTimeout(res, SEBESSEG));

const iranyvaltozas = async (event) => {
    if (foroghat){
        foroghat = false;
        if (KIGYOFEJ.irany == "ArrowUp" && event.key != "ArrowDown") {
            KIGYOFEJ.irany = event.key;
        }
        if (KIGYOFEJ.irany == "ArrowDown" && event.key != "ArrowUp") {
            KIGYOFEJ.irany = event.key;
        }
        if (KIGYOFEJ.irany == "ArrowLeft" && event.key != "ArrowRight") {
            KIGYOFEJ.irany = event.key;
        }
        if (KIGYOFEJ.irany == "ArrowRight" && event.key != "ArrowLeft") {
            KIGYOFEJ.irany = event.key;
        }
        await varj();
        foroghat = true;
    }
}
function mozog(){
    for(let j = 0; j < kigyo.length; j++){
        if (j != 0){
            if (kigyo[j - 1].x - kigyo[j].x == 0 && (kigyo[j - 1].y + ((j-1)*ELEMNAGYSAG)) - (kigyo[j].y + (j*ELEMNAGYSAG)) == 50){
                kigyo[j].irany = "ArrowDown";
            }
            if (kigyo[j - 1].x - kigyo[j].x == 0 && (kigyo[j - 1].y + ((j-1)*ELEMNAGYSAG)) - (kigyo[j].y + (j*ELEMNAGYSAG)) == -50){
                kigyo[j].irany = "ArrowUp";
            }
            if (kigyo[j - 1].x - kigyo[j].x == 50 && (kigyo[j - 1].y + ((j-1)*ELEMNAGYSAG)) - (kigyo[j].y + (j*ELEMNAGYSAG)) == 0) {
                kigyo[j].irany = "ArrowRight";
            }
            if (kigyo[j - 1].x - kigyo[j].x == -50 && (kigyo[j - 1].y + ((j-1)*ELEMNAGYSAG)) - (kigyo[j].y + (j*ELEMNAGYSAG)) == 0) {
                kigyo[j].irany = "ArrowLeft";
            }
        }
    }
    kigyo.forEach(resz => {
        if (resz.irany == "ArrowDown"){
            resz.y += ELEMNAGYSAG;
        }
        if (resz.irany == "ArrowUp"){
            resz.y -= ELEMNAGYSAG;
        }
        if (resz.irany == "ArrowRight"){
            resz.x += ELEMNAGYSAG;
        }
        if (resz.irany == "ArrowLeft"){
            resz.x -= ELEMNAGYSAG;
        }
    });
}

function rajzol(){
    for(let l = 0; l < kigyo.length; l++){
        if (l == 0){
            kigyo[l].style.left = kigyo[l].x + "px";
            kigyo[l].style.top = kigyo[l].y + "px";
                if (kigyo[l].irany == "ArrowDown"){
                    kigyo[l].style.backgroundImage = elemek.FEJ_LE;
                }
                if (kigyo[l].irany == "ArrowLeft"){
                    kigyo[l].style.backgroundImage = elemek.FEJ_BALRA;
                }
                if (kigyo[l].irany == "ArrowUp"){
                    kigyo[l].style.backgroundImage = elemek.FEJ_FEL;
                }
                if (kigyo[l].irany == "ArrowRight"){
                    kigyo[l].style.backgroundImage = elemek.FEJ_JOBBRA;
                }
            }
        if (l > 0 && l < kigyo.length-1){
            if (kigyo[l - 1].irany == "ArrowDown" && kigyo[l].irany == "ArrowRight"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK3;
            }
            if (kigyo[l - 1].irany == "ArrowDown" && kigyo[l].irany == "ArrowLeft"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK1;
            }
            if (kigyo[l - 1].irany == "ArrowDown" && kigyo[l].irany == "ArrowDown"){
                kigyo[l].style.backgroundImage = elemek.TEST_FUGGOLEGES;
            }
            if (kigyo[l - 1].irany == "ArrowUp" && kigyo[l].irany == "ArrowRight"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK4;
            }
            if (kigyo[l - 1].irany == "ArrowUp" && kigyo[l].irany == "ArrowLeft"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK2;
            }
            if (kigyo[l - 1].irany == "ArrowUp" && kigyo[l].irany == "ArrowUp"){
                kigyo[l].style.backgroundImage = elemek.TEST_FUGGOLEGES;
            }
            if (kigyo[l - 1].irany == "ArrowRight" && kigyo[l].irany == "ArrowUp"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK1;
            }
            if (kigyo[l - 1].irany == "ArrowRight" && kigyo[l].irany == "ArrowDown"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK2;
            }
            if (kigyo[l - 1].irany == "ArrowRight" && kigyo[l].irany == "ArrowRight"){
                kigyo[l].style.backgroundImage = elemek.TEST_VIZSZINTES;
            }
            if (kigyo[l - 1].irany == "ArrowLeft" && kigyo[l].irany == "ArrowUp"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK3;
            }
            if (kigyo[l - 1].irany == "ArrowLeft" && kigyo[l].irany == "ArrowDown"){
                kigyo[l].style.backgroundImage = elemek.TEST_SAROK4;
            }
            if (kigyo[l - 1].irany == "ArrowLeft" && kigyo[l].irany == "ArrowLeft"){
                kigyo[l].style.backgroundImage = elemek.TEST_VIZSZINTES;
            }
            
        }
        if (l < 4){
            kigyo[l].style.left = kigyo[l].x + "px";
            kigyo[l].style.top = kigyo[l].y + "px";
        }
        else{
            kigyo[l].style.left = kigyo[l].x + "px";
            kigyo[l].style.top = (kigyo[l].y - ELEMNAGYSAG) + "px";
        }
    }
    farok();
    
}

function halal(){
    if (KIGYOFEJ.x < 0 || KIGYOFEJ.y < 0 || KIGYOFEJ.x >= PALYASZELESSEG || KIGYOFEJ.y >= PALYAMAGASSAG){
        fut = false;
        el = false;
    }
    for(let m = 1; m < kigyo.length; m++){
        if (kigyo[m].x == KIGYOFEJ.x && (kigyo[m].y + m * ELEMNAGYSAG) == KIGYOFEJ.y){
            fut = false;
            el = false;
        }
    }
}

function eszik(){
    if (parseInt(KIGYOFEJ.x / ELEMNAGYSAG) == alma.x && parseInt(KIGYOFEJ.y / ELEMNAGYSAG) == (alma.y + 4)){
        pontok += 1;
        pont.textContent = `pontok: ${pontok}`;
        random_alma();
        kigyo.push(document.createElement("div"));
        div_tulajdonsagok(kigyo[kigyo.length - 1]);
        farok();
    }
}

function random_alma(){
    helyek = [];
    for (let o = 4; o < parseInt(PALYAMAGASSAG / ELEMNAGYSAG + 4); o++) {
        helyek.push([]);
        for (let p = 0; p < parseInt(PALYASZELESSEG / ELEMNAGYSAG); p++) {
            helyek[o-4].push([o, p]);
        }
    }
    helyek.forEach(koordinata => {
        for (let q = 0; q < kigyo.length; q++) {
            koordinata.forEach(hely => {
                if (kigyo[q].x / ELEMNAGYSAG == hely[1] && (kigyo[q].y / ELEMNAGYSAG + q) + 4 == hely[0]) {
                    koordinata.splice(koordinata.indexOf(hely), 1);
                }
            });    
        }
    });
    helyek.forEach(koordinata => {
        if (koordinata == []){
            helyek.splice(helyek.indexOf(koordinata),1);
        }
    })
    let oszlop = helyek[parseInt(Math.floor(Math.random() * helyek.length))]; 
    let sor = oszlop[Math.floor(Math.random()*oszlop.length)];
    console.log(helyek);
    console.log(oszlop);
    console.log(sor);
    alma.x = sor[1];
    alma.y = sor[0] - 8;
    alma.style.left = (alma.x * ELEMNAGYSAG) + "px";
    alma.style.top = (alma.y * ELEMNAGYSAG) + "px";
    alma.style.backgroundImage = elemek.CSERESZNYE;
    alma.style.position = "relative";
    alma.style.width = ELEMNAGYSAG + "px";
    alma.style.height = ELEMNAGYSAG + "px";
    alma.style.backgroundSize = "contain";
}

function div_tulajdonsagok(div){
    div.className = "testresz";
    div.x = kigyo[kigyo.length - 2].x;
    div.y = kigyo[kigyo.length - 2].y - ELEMNAGYSAG;
    div.style.left = div.x + "px";
    div.style.top = div.y + "px";
    div.style.backgroundSize = "contain";
    div.style.width = ELEMNAGYSAG + "px";
    div.style.height = ELEMNAGYSAG + "px";
    div.style.position = "relative";
    JATEKMEZO.appendChild(kigyo[kigyo.length - 1]);
}

function farok(){
    if (kigyo[kigyo.length - 2].irany == "ArrowDown"){
        kigyo[kigyo.length - 1].style.backgroundImage = elemek.FAROK_LE;
    }
    if (kigyo[kigyo.length - 2].irany == "ArrowUp") {
        kigyo[kigyo.length - 1].style.backgroundImage = elemek.FAROK_FEL;
    }
    if (kigyo[kigyo.length - 2].irany == "ArrowLeft") {
        kigyo[kigyo.length - 1].style.backgroundImage = elemek.FAROK_BALRA;
    }
    if (kigyo[kigyo.length - 2].irany == "ArrowRight") {
        kigyo[kigyo.length - 1].style.backgroundImage = elemek.FAROK_JOBBRA;
    }
}