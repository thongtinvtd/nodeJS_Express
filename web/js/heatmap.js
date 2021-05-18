let maxValue = 100

const drawCircle = (posPiece,intensity) => {
    const square = document.getElementsByClassName('cellBlack');
    const circle = document.createElement("div")
    const posX = posPiece[0];
    const posY = posPiece[1];
    const pos = mapPosition(posX,posY);
    classNameCircle = 'circle' + pos
    console.log(classNameCircle);
    square[pos-1].innerHTML = `<div class=${classNameCircle} \
                            style='width:60px;height:60px;margin-left:6px;\
                            border-radius:50%;background-color:white;'></div>`
    if(intensity>maxValue){
        intensity = maxValue;
    }
    const color = mapColor(intensity,0,maxValue,99,20) + "%"
    document.querySelector(`.circle${pos}`).style.backgroundColor="hsl(0,100%,"+color+")" ;
}
function mapPosition(posX,posY){
    let pos = 1;
    pos = posX*0.5 + 0.5 + posY*4
    if(posY%2!=0){
        pos += 0.5;
    }
    return pos
}

function mapColor(value,min1,max1,min2,max2){
    return ((value - min1)*(max2-min2)/(max1 - min1)) + min2;
}

function getInfoHeatmap(piece){
    const url = `http://localhost:5000/post/heatmap/${piece}`;
    // let target=[];
    fetch(url)
    .then(async res => {
        const data = await res.json();
        console.log('[Response]',data); 
        })
    }
function getAllInfoHeatmap(){
    const url = `http://localhost:5000/post/heatmap`;
    // let target=[];
    let dataReturn = [];
    fetch(url)
    .then(async res => {
        const data = await res.json();
        // const strJSON = JSON.stringify(data);
        console.log('[Response All]',data); 
        dataReturn = data;
        data.forEach(e => {
            for(let i=0;i<e.posX.length;i++){
                drawCircle([e.posX[i],e.posY[i]],i);
            }
        });
      
        })
    .catch((error) => {
    console.error('Error:', error);
    })
    drawColorBarText()
    return dataReturn;
}

function drawColorBarText(){
    const textBar = document.getElementsByClassName('valueBar');
    for(i=0;i<5;i++){
        textBar[i].innerHTML = maxValue - maxValue*i/5;
        }
}

// const data = getAllInfoHeatmap();
// console.log(data)
setInterval(()=>{
    getAllInfoHeatmap();
},30000);