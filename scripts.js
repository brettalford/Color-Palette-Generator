
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
    //console.log(numbers)

    //colchange1(numbers)
    //complementary(numbers)

    return numbers


}


function colchange1(colorlist){
    for(let i =2;i>=0;i--){
        colorlist[i]+=255;
        if (colorlist[i]>255){
            colorlist[i]-=128;
        }
        if (colorlist[i]>255){
            colorlist[i]-=128;
        }
        
    }

    console.log(colorlist);

}


function complementary(colorlist){
    for(let i =2;i>=0;i--){
        if(colorlist[i]>127){
            colorlist[i]-=127
        }
        else{
            colorlist[i]+=127
        }
    }
    console.log(colorlist)
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
