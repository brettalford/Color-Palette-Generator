
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
    let randomOffset = (Math.random() * 50 - 25); 
    hue = (hue + randomOffset + 360) % 360;
    return hue;
}

// Complementary color with randomness
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
    h = (h - 25 + 360) % 360;
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
    return hex;
}



//OKAY SO THE LOGIC PART FOR COLOR ASSOCIATION IS DONE, BUTTON TIME


//So many things need to be put in im going to go crazy




function compl(){
    let holdclash;
    const elements=[c1,c2,c3,c4,c5]
    console.log(rgbToHex(starred));
    for(let i=0;i<=4;i++){
        if(locked[i] != true){
            holdcompl=rgbToHex(getComplementaryColor(starred));
            elements[i].style.backgroundColor=holdcompl;
    }
    }
    updateUI();

}


function clash(){
    let holdclash;
    const elements=[c1,c2,c3,c4,c5]
    for(let i=0;i<=4;i++){
        if(locked[i] != true){
            holdclash=rgbToHex(getClashingColor(starred));
            elements[i].style.backgroundColor=holdclash;
    }
    }
    updateUI();
}


function analog(){
    let holdana;
    const elements=[c1,c2,c3,c4,c5]
    for(let i=0;i<=4;i++){
        if(locked[i] != true){
            holdana=rgbToHex(getAnalogousColor(starred));
            elements[i].style.backgroundColor=holdana;
    }
    }
    updateUI();
}

function randy(){
    let holdrand;
    const elements=[c1,c2,c3,c4,c5]
    for(let i=0;i<=4;i++){
        if(locked[i] != true){
            holdrand=rgbToHex(numgen());
            elements[i].style.backgroundColor=holdrand;
    }
    }
    updateUI();
}





//lower button section

const c1=document.getElementById("c1");
const c2=document.getElementById("c2");
const c3=document.getElementById("c3");
const c4=document.getElementById("c4");
const c5=document.getElementById("c5");



const random=document.getElementById("random");
random.onclick=randy;
const analo=document.getElementById("analo");
analo.onclick=analog;
const clashing=document.getElementById("clashing");
clashing.onclick=clash;
const complementary=document.getElementById("complementary");
complementary.onclick=compl;




//lock buttons and function

const icon=[
    document.getElementById("lockimg1"),
    document.getElementById("lockimg2"),
    document.getElementById("lockimg3"),
    document.getElementById("lockimg4"),
    document.getElementById("lockimg5")
];
let locked=[false,false,false,false,false];
function locking(locknum){
    const elements=[c1,c2,c3,c4,c5]
    if (locked[locknum-1]==true){
        locked[locknum-1]=false;
        icon[locknum-1].src = "https://github.com/brettalford/Color-Palette-Generator/blob/main/unlock_locked.png?raw=true";
    }
    else{
        locked[locknum-1]=true;
        icon[locknum-1].src = "https://github.com/brettalford/Color-Palette-Generator/blob/main/lock_locked.png?raw=true";
    }

}



const lockbutton1=document.getElementById("lockbutton1");
lockbutton1.onclick=()=>locking(1);
const lockbutton2=document.getElementById("lockbutton2");
lockbutton2.onclick=()=>locking(2);
const lockbutton3=document.getElementById("lockbutton3");
lockbutton3.onclick=()=>locking(3);
const lockbutton4=document.getElementById("lockbutton4");
lockbutton4.onclick=()=>locking(4);
const lockbutton5=document.getElementById("lockbutton5");
lockbutton5.onclick=()=>locking(5);





let starred=numgen();

//only one can be starred, when starred the rgb of that (c1,c2,c3,c4, or c5) become the starred value and icon image is changed to its
//counterpart so that only one can be starred at a time, this starring is used as a way to select which color the analogous, 
//set by default to c1
function parseRGBString(rgbString) {
    let result = rgbString.match(/\d+/g);
    return result ? result.slice(0, 3).map(Number) : [0, 0, 0];
}

function staring(starnum){
    const elements=[c1,c2,c3,c4,c5];
    const icons = [
        document.getElementById("starimg1"),
        document.getElementById("starimg2"),
        document.getElementById("starimg3"),
        document.getElementById("starimg4"),
        document.getElementById("starimg5")
    ];
    starred=parseRGBString(elements[starnum-1].style.backgroundColor);
    for (let i = 0; i < 5; i++) {
        if (i === starnum - 1) {
            locked[i] = true;
            icon[i].src = "https://github.com/brettalford/Color-Palette-Generator/blob/main/lock_locked.png?raw=true"
            icons[i].src = "https://github.com/brettalford/Color-Palette-Generator/blob/main/star-starred.png?raw=true";
        }
        else{
            icons[i].src = "https://github.com/brettalford/Color-Palette-Generator/blob/main/star.png?raw=true";
        }
    }
}

const starbutton1=document.getElementById("starbutton1");
starbutton1.onclick=()=>staring(1);
const starbutton2=document.getElementById("starbutton2");
starbutton2.onclick=()=>staring(2);
const starbutton3=document.getElementById("starbutton3");
starbutton3.onclick=()=>staring(3);
const starbutton4=document.getElementById("starbutton4");
starbutton4.onclick=()=>staring(4);
const starbutton5=document.getElementById("starbutton5");
starbutton5.onclick=()=>staring(5);



//hexcode boxes
const hex1 = document.getElementById("hex1");
const hex2 = document.getElementById("hex2");
const hex3 = document.getElementById("hex3");
const hex4 = document.getElementById("hex4");
const hex5 = document.getElementById("hex5");

const hexInputs = [hex1, hex2, hex3, hex4, hex5];
const colorDivs = [c1, c2, c3, c4, c5];

function isValidHex(hex) {
    return /^#([0-9A-Fa-f]{6})$/.test(hex);
}

// Update color divs and input fields when color is generated
function updateUI() {
    for (let i = 0; i < 5; i++) {
        let bg = colorDivs[i].style.backgroundColor;
        let rgb = parseRGBString(bg);
        hexInputs[i].value = rgbToHex(rgb);
    }
}

// Let user change the input field manually
hexInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        const hex = input.value;
        if (isValidHex(hex)) {
            colorDivs[index].style.backgroundColor = hex;

            // If this color is currently starred, update the starred value
            const starredStyle = colorDivs[index].style.backgroundColor;
            if (parseRGBString(starredStyle).toString() === starred.toString()) {
                starred = parseRGBString(starredStyle);
            }
        }
    });
});

function syncColorsWithHexInputs() {
    const elements = [c1, c2, c3, c4, c5];
    const hexInputs = [hex1, hex2, hex3, hex4, hex5];

    for (let i = 0; i < 5; i++) {
        let bgColor = elements[i].style.backgroundColor;
        let rgb = parseRGBString(bgColor);
        let hex = rgbToHex(rgb);
        hexInputs[i].value = hex;
        elements[i].style.backgroundColor = hex; // Ensure bg is in hex
    }
}




randy();
syncColorsWithHexInputs();

