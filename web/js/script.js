document.body.classList.add('loading');

function onOpenCVReady() {
    document.body.classList.remove('loading');
};


var scene, camera, renderer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x909090);

camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,300,100);
camera.lookAt(0,0,0);

var abint = new THREE.AmbientLight(0x404040,7);
scene.add(abint);

var spotLight1 = new THREE.SpotLight(0xffffff);
spotLight1.position.set(-1000,-1000,1000);
scene.add(spotLight1);
// var spotLight2 = new THREE.SpotLight(0xeeeeee);
// spotLight2.position.set(1000,-1000,1000);
// scene.add(spotLight2);
// var spotLight3 = new THREE.SpotLight(0xeeeeee);
// spotLight3.position.set(-500,1000,300);
// scene.add(spotLight3);
const directLight = new THREE.DirectionalLight(0xffffff,0.6);
directLight.position.set(100,-300,400)
scene.add(directLight);

// var loader = new THREE.GLTFLoader();
// loader.load('model/chessboard_pieces2.glb',function(gltf){
//     scene.add(gltf.scene);
//     gltf.scene; // THREE.Group
//     gltf.scenes; // Array<THREE.Group>
//     gltf.cameras; // Array<THREE.Camera>
//     gltf.asset; // Object
// });

// var geometry = new THREE.BoxGeometry(100,100,100);
// var material = new THREE.MeshNormalMaterial();
// var cube = new THREE.Mesh(geometry,material);
// scene.add(cube);

// square1.moveTo( 25, 25 );
// square1.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
// square1.bezierCurveTo( 30, 0, 30, 35,30,35 );
// square1.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
// square1.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
// square1.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
// square1.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
function drawSquare(color) {
    const geometry = new THREE.BoxBufferGeometry(50,10,50);
    const material = new THREE.MeshLambertMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

function drawRowOdd(){
    const rowOdd = new THREE.Group();
    for(let j=0;j<4;j++){
        for(let i=0;i<4;i++){
            const white1 = drawSquare(0x808080);
            white1.position.x += -200 + 100*i;
            white1.position.z = -200+j*100;
            const black1 = drawSquare(0x202020);
            black1.position.x += (-150+100*i);
            black1.position.z = -200+j*100;
            rowOdd.add(white1);
            rowOdd.add(black1);
        }
    }
    return rowOdd;
}
function drawRowEven(){
    const rowEven = new THREE.Group();
    for(let j=0;j<4;j++){
        for(let i=0;i<4;i++){
            const white1 = drawSquare(0x202020);
            white1.position.x += -200 + 100*i;
            white1.position.z = -150+j*100;
            const black1 = drawSquare(0x808080);
            black1.position.x += (-150+100*i);
            black1.position.z = -150+j*100;

            rowEven.add(white1);
            rowEven.add(black1);
            } 
        }
    return rowEven;
}

function drawBoard(){
    const board = new THREE.Group();

    cellOdds = drawRowOdd();
    cellEvens = drawRowEven();

    board.add(cellOdds);
    board.add(cellEvens);

    return board;
}
const board = drawBoard();
scene.add(board);
// console.log(board.position.x)
// console.log(board.position.z)
//chess pieces
//texture king
const loader = new THREE.TextureLoader();

function drawCylinder(locateX,locateY,color,path,focus){
    const geometry = new THREE.CylinderGeometry(22,22,20,32);
    // const materials = [
    //     sideMaterial,
    //     topMaterial,
    //     bottomMaterial
    //   ]
    //   const geometry = new THREE.CylinderGeometry(5, 5, 0.5, 100)
    //   const mesh= new THREE.Mesh(geometry, materials)
    if(focus) {
        color = 0x550000; //color of the focus piece
    }
    const material = [
        new THREE.MeshLambertMaterial({color : color}),
        new THREE.MeshLambertMaterial({map : loader.load(path)}),
        new THREE.MeshLambertMaterial({color : color})
      ]
      const cylinder = new THREE.Mesh(geometry,material);
      cylinder.position.x = -200+locateX*50;
      cylinder.position.y = 15;
      cylinder.position.z = -200+locateY*50;

    return cylinder;
}

colorPieceBlack = 0x202020;
colorPieceWhite = 0x505050;

function drawKingBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/king1.png',focus);
    return cylinder
}
function drawQueenBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/queen1.png',focus);
    return cylinder
}
function drawBishopBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/bishop1.png',focus);
    return cylinder
}
function drawKnightBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/knight1.png',focus);
    return cylinder
}
function drawCastleBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/castle1.png',focus);
    return cylinder
}
function drawPawnBlack(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceBlack,'imgPieces/pawn1.png',focus);
    return cylinder
}

function drawQueenWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/queen2.png',focus);
    return cylinder
}
function drawKingWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/king2.png',focus);
    return cylinder
}
function drawBishopWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/bishop2.png',focus);
    return cylinder
}
function drawKnightWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/knight2.png',focus);
    return cylinder
}
function drawCastleWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/castle2.png',focus);
    return cylinder
}
function drawPawnWhite(locateX,locateY,focus){
    cylinder = drawCylinder(locateX,locateY,colorPieceWhite,'imgPieces/pawn2.png',focus);
    return cylinder
}

var castleBlack = [drawCastleBlack(0,0,1),drawCastleBlack(7,0)]
var knightBlack = [drawKnightBlack(1,0),drawKnightBlack(6,0)];
var bishopBlack = [drawBishopBlack(2,0),drawBishopBlack(5,0)];
var kingBlack = [drawKingBlack(3,0)];
var queenBlack = [drawQueenBlack(4,0)];

scene.add(castleBlack[0]) ;
scene.add(knightBlack[0]) ;
scene.add(bishopBlack[0]) ;
scene.add(castleBlack[1]) ;
scene.add(knightBlack[1]) ;
scene.add(bishopBlack[1]) ;
scene.add(kingBlack[0]) ;
scene.add(queenBlack[0]) ;

var pawnBlack = [];
for (let i=0;i<8;i++){
    pawnBlack[i] = drawPawnBlack(i,1)
    scene.add(pawnBlack[i]);
}

var castleWhite = [drawCastleWhite(0,7),drawCastleWhite(7,7)]
var knightWhite = [drawKnightWhite(1,7),drawKnightWhite(6,7)];
var bishopWhite = [drawBishopWhite(2,7),drawBishopWhite(5,7)];
var kingWhite = [drawKingWhite(3,7)];
var queenWhite = [drawQueenWhite(4,7)];

scene.add(castleWhite[0]) ;
scene.add(knightWhite[0]) ;
scene.add(bishopWhite[0]) ;
scene.add(castleWhite[1]) ;
scene.add(knightWhite[1]) ;
scene.add(bishopWhite[1]) ;
scene.add(kingWhite[0]) ;
scene.add(queenWhite[0]) ;

var pawnWhite = [];
for (let i=0;i<8;i++){
    pawnWhite[i] = drawPawnWhite(i,6)
    scene.add(pawnWhite[i]);
}

//render 
renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);

document.getElementById("canvas1").appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.update();

function movePiece(piece,target=[]){
    piece.position.x = target[0]*50-200;
    piece.position.z = target[1]*50-200;
}

function move1step(piece,direction){
    if(direction == "up"){
        piece.position.z -= 50;
    } 
    else if (direction == "down"){
        piece.position.z += 50;
    }
    else if (direction == "left"){
        piece.position.x -= 50;
    }
    else if (direction == "right"){
        piece.position.x += 50;
    }
}
+new Date
var timestamp = undefined;
var lastTimestamp = undefined;

function moveArrowKey(piece){
    window.addEventListener("keydown",function(event){
        if(event.key == "ArrowUp"
            || event.key == "ArrowDown"
            || event.key == "ArrowLeft"
            || event.key == "ArrowRight"
        ){
            timestamp = Date.now();
        }
        
    })
    window.addEventListener("keyup", function (event) {
        lastTimestamp = timestamp;
        timestamp = Date.now();
        if((timestamp - lastTimestamp) >= 2){
            if (event.key == "ArrowUp") {
                move1step(piece,"up")
            } else
            if (event.key == "ArrowDown") {
                move1step(piece,"down")
            } else 
            if (event.key == "ArrowLeft") {
                move1step(piece,"left")
            } else
            if (event.key == "ArrowRight") {
                move1step(piece,"right")
                }
        }})
    // when moving the piece -> save its position to DB
    // example: id of pawn black {60807df44bd4d33541164e1d}
    url = `http://localhost:5000/post/60807df44bd4d33541164e1d`;
    posX = (piece.position.x+200)/50
    posY = (piece.position.z+200)/50
    dataJsonPos = {position:{posX:posX,posY:posY}}
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

const focusPiece = drawSquare(0x550000);
focusPiece.position.x = -200;
focusPiece.position.y = 0.5;
focusPiece.position.z = -200;
scene.add(focusPiece);
console.log(focusPiece.position.x)
console.log(focusPiece.position.z)

function start(){
    focusPiece.position.x = -200;
    focusPiece.position.y = 0.5;
    focusPiece.position.z = -200;
}

var timestamp1 = 0;
var lastTimestamp1 = 0;


function getInfo(){
    let url = `http://localhost:5000/post`;
    // let target=[];
    fetch(url)
    .then(async res => {
        const data = await res.json();
        console.log('[Response]',data[16]); //[16] position in the DB of white pawn 1
        let target = [data[16].position.posX,data[16].position.posY];
        console.log(target);
        movePiece(pawnWhite[0],target);

        return target;
        })
    }
// const target = getInfo();
// function movePieceServer(){
//     timestamp1 = Date.now();
//     if((timestamp1 - lastTimestamp1)>10000){
//         var target = getInfo();
//         lastTimestamp1 = timestamp1;

//         console.log(lastTimestamp1)
//         console.log(target);
//         movePiece(pawnWhite[0],target);
//     }
// }

function animate(){
    moveArrowKey(pawnBlack[3]);
    pawnBlack[4].rotation.y += 0.3
    getInfo();
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  window.addEventListener("resize", onWindowResize);
  
