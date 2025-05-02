
//this function will generate an array of 6 numbers and convert them to hex form, pushing to an array
function numgen(){
    let numbers=[];
    const min=Math.floor(0);
    const max=Math.ceil(255);
    let quant=3;
    for(quant;quant>0;quant--){
        let num=Math.floor(Math.random()*( max -min+1))+min;
        numbers.push(num)
    }
    

    return numbers


}


function rgbToHsl(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l;

    l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        if (max === r) {
            h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        } else if (max === g) {
            h = ((b - r) / d + 2) * 60;
        } else if (max === b) {
            h = ((r - g) / d + 4) * 60;
        }
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;

    h /= 360;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function addHueRandomness(hue) {
    let randomOffset = (Math.random() * 36 - 18); // ±5% of 360
    hue = (hue + randomOffset + 360) % 360;
    return hue;
}

// Complementary color with ~5% randomness
function getComplementaryColor(rgb) {
    let [h, s, l] = rgbToHsl(rgb);
    h = (h + 180) % 360;
    h = addHueRandomness(h);
    return hslToRgb(h, s, l);
}

// Analogous color 1 (~30° shift)
function getAnalogousColor1(rgb) {
    let [h, s, l] = rgbToHsl(rgb);
    h = (h + 30) % 360;
    h = addHueRandomness(h);
    return hslToRgb(h, s, l);
}

// Analogous color 2 (~-30° shift)
function getAnalogousColor2(rgb) {
    let [h, s, l] = rgbToHsl(rgb);
    h = (h - 30 + 360) % 360;
    h = addHueRandomness(h);
    return hslToRgb(h, s, l);
}

// One of the two analogous colors, chosen at random
function getAnalogousColor(rgb) {
    return Math.random() < 0.5 ? getAnalogousColor1(rgb) : getAnalogousColor2(rgb);
}

// Clashing (opposing) color: rotate RGB channels with slight randomness
function getClashingColor(rgb) {
    let rotated = [rgb[1], rgb[2], rgb[0]];
    return rotated.map(val => {
        let offset = val * 0.05 * (Math.random() * 2 - 1); // ±5% offset
        return Math.min(255, Math.max(0, Math.round(val + offset)));
    });
}




function hexToRGB(hexex){
    let rgb=[];
    
    for(let i=1;i<=5;i+=2){
        let temp=hexex[i]+hexex[i+1];
        rgb.push(parseInt(temp, 16));
    }
    console.log(rgb);
    return rgb;
}


function rgbToHex(rgb){
    charsofhex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    let hex=["#"];
    for(let i=0;i<=2;i++){
        hex+=(charsofhex[(parseInt(rgb[i]/16))]);
        hex+=(charsofhex[(rgb[i]%16)]);
    }
    console.log(hex)
    return hex;
}



//OKAY SO THE LOGIC PART FOR COLOR ASSOCIATION IS DONE, BUTTON TIME


//So many things need to be put in im going to go crazy

const hex1=document.querySelector("#hex1");
const hex2=document.querySelector("#hex2");
const hex3=document.querySelector("#hex3");
const hex4=document.querySelector("#hex4");
const hex5=document.querySelector("#hex5");

const lockbutton1=document.querySelector("lockbutton1");
const lockbutton2=document.querySelector("lockbutton2");
const lockbutton3=document.querySelector("lockbutton3");
const lockbutton4=document.querySelector("lockbutton4");
const lockbutton5=document.querySelector("lockbutton5");

const lockimg1=document.querySelector("lockimg1");
const lockimg2=document.querySelector("lockimg2");
const lockimg3=document.querySelector("lockimg3");
const lockimg4=document.querySelector("lockimg4");
const lockimg5=document.querySelector("lockimg5");

const starbutton1=document.querySelector("starbutton1");
const starbutton2=document.querySelector("starbutton2");
const starbutton3=document.querySelector("starbutton3");
const starbutton4=document.querySelector("starbutton4");
const starbutton5=document.querySelector("starbutton5");

const starimg1=document.querySelector("starimg1");
const starimg2=document.querySelector("starimg2");
const starimg3=document.querySelector("starimg3");
const starimg4=document.querySelector("starimg4");
const starimg5=document.querySelector("starimg5");

const complementary=document.querySelector("#complementary");
const clashing=document.querySelector("#clashing");
const analo=document.querySelector("#analo");
const random=document.querySelector("#random");

const c1=document.querySelector("#c1");
const c2=document.querySelector("#c2");
const c3=document.querySelector("#c3");
const c4=document.querySelector("#c4");
const c5=document.querySelector("#c5");




lockbutton1.onclick=locking(1);
lockbutton2.onclick=locking(2);
lockbutton3.onclick=locking(3);
lockbutton4.onclick=locking(4);
lockbutton5.onclick=locking(5);

function locking(starnum){
    switch(starnum){
        case 1:
        
        break;
        case 2:
        
        break;
        case 3:
        
        break;
        case 4:
        
        break;
        case 5:
        
        break;
        default:
        break;
    }
}

starbutton1.onclick=staring(1);
starbutton2.onclick=staring(2);
starbutton3.onclick=staring(3);
starbutton4.onclick=staring(4);
starbutton5.onclick=staring(5);

function staring(locknum){
    switch(locknum){
        case 1:
        
        break;
        case 2:
        
        break;
        case 3:
        
        break;
        case 4:
        
        break;
        case 5:
        
        break;
        default:
        break;
    }
}


complementary.onclick=compl;

function compl(){


}

clashing.onclick=clash;

function clash(){

}

analo.onclick=analog;

function analog(){

}


random.onclick=randy;

function randy(){

}







// Example usage:
const input = numgen()
console.log("Original RGB:", input);
console.log("Complementary:", getComplementaryColor(input));
console.log("Analogous:", getAnalogousColor(input));
console.log("Opposing (Clashing):", getClashingColor(input));



//this will hold the initial randomized color
let colorInitGen=[]
//hexToRGB()
//rgbToHex([0,25,210])
