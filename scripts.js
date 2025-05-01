
//this function will generate an array of 6 numbers and convert them to hex form, pushing to an array
function numgen(){
    const presetList=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let numbers=["#"];
    const min=Math.floor(0);
    const max=Math.ceil(15);
    let quant=6;
    for(quant;quant>0;quant--){
        let num=Math.floor(Math.random()*( max -min+1))+min;
        numbers+=presetList[num]
    }
    console.log(numbers)

}



//this will hold the initial randomized color
let colorInitGen=[]
numgen()