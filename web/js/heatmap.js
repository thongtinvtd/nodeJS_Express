let maxValue = 100

const drawCircle = (posPiece, intensity) => {
    const square = document.getElementsByClassName('cellBlack');
    const circle = document.createElement("div")
    const posX = posPiece[0];
    const posY = posPiece[1];
    const pos = mapPosition(posX, posY);
    classNameCircle = 'circle' + pos
    console.log(classNameCircle);
    // 
    square[pos - 1].innerHTML = `<div class=${classNameCircle} \
                            style='width:60px;height:60px;margin-left:6px;\
                            display:flex;justify-content: center;\
                            align-items: center;border-radius:50%;\
                            background-color:white;'></div>`
    if (intensity > maxValue) {
        intensity = maxValue;
    }
    const color = mapColor(intensity, 0, maxValue, 99, 20) + "%"
    document.querySelector(`.circle${pos}`).style.backgroundColor = "hsl(0,100%," + color + ")";
    const textIntensity = document.createElement("div");
    textIntensity.appendChild(document.createTextNode(`${intensity}`))
    document.querySelector(`.circle${pos}`).appendChild(textIntensity);

    // document.querySelector(`.circle${pos}>div`).style.paddingTop = "20px";

}
function mapPosition(posX, posY) {
    let pos = 1;
    pos = posX * 0.5 + 0.5 + posY * 4
    if (posY % 2 != 0) {
        pos += 0.5;
    }
    return pos
}

function mapColor(value, min1, max1, min2, max2) {
    return ((value - min1) * (max2 - min2) / (max1 - min1)) + min2;
}

function getAllInfoHeatmap() {
    const url = `http://localhost:5000/post/heatmap`;
    // let target=[];
    fetch(url)
        .then(async res => {
            const data = await res.json();
            // const strJSON = JSON.stringify(data);
            console.log('[Response All]', data);
            data.forEach(e => {
                for (let i = 0; i < e.posX.length; i++) {
                    drawCircle([e.posX[i], e.posY[i]], i);
                }
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        })
    drawColorBarText()
}

function drawColorBarText() {
    const textBar = document.getElementsByClassName('valueBar');
    for (i = 0; i < 5; i++) {
        textBar[i].innerHTML = maxValue - maxValue * i / 5;
    }
}

// const data = getAllInfoHeatmap();
// console.log(data)
getAllInfoHeatmap();
setInterval(() => {
    getAllInfoHeatmap();
}, 30000);