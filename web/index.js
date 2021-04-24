const posX = document.querySelector("#posX");
const posY = document.querySelector("#posY");

const url = `http://localhost:5000/post`;

function getInfo(){
fetch(url)
.then(async res => {
    const data = await res.json();
    console.log('[Response]',data[3]);
    posX.innerHTML = data[3].position.posX;
    posY.innerHTML = data[3].position.posY;
    })
}

const inputX = document.querySelector("#inputX");
const inputY = document.querySelector("#inputY");
function movePiece(){

    let posX = inputX.value;
    let posY = inputY.value;

    console.log(posX," ",posY);
    // example: id of pawn black {60807df44bd4d33541164e2a}
    let url = `http://localhost:5000/post/60807e7d4bd4d33541164e2a`;
    dataJsonPos = {position:{posX:posX,posY:posY}};
    fetch(url,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataJsonPos),
    })    
    .then(response => response.json())
    // .then(data => {
    // console.log('Success:', data);
    // })
    .catch((error) => {
    console.error('Error:', error);
});

}