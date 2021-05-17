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

var abint = new THREE.AmbientLight(0x404040,8);
scene.add(abint);

var spotLight1 = new THREE.SpotLight(0xffffff);
spotLight1.position.set(-500,-500,500);
scene.add(spotLight1);
// var spotLight2 = new THREE.SpotLight(0xeeeeee);
// spotLight2.position.set(1000,-1000,1000);
// scene.add(spotLight2);
// var spotLight3 = new THREE.SpotLight(0xeeeeee);
// spotLight3.position.set(-500,1000,300);
// scene.add(spotLight3);
const directLight = new THREE.DirectionalLight(0xffffff,1);
directLight.position.set(100,-200,300)
scene.add(directLight);

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
//
const loader = new THREE.TextureLoader();

function drawCylinder(locateX,locateY,color,isKing){
    const cylinderGeometry = new THREE.CylinderGeometry(20,20,10,32);
    var material = [];
    if(isKing) {
        material = [
            new THREE.MeshLambertMaterial({color : color}),
            new THREE.MeshLambertMaterial({color : color}),
            new THREE.MeshLambertMaterial({color : color})
          ];
    } else {
        material = [
            new THREE.MeshLambertMaterial({color : color}),
            new THREE.MeshLambertMaterial({color : color}),
            new THREE.MeshLambertMaterial({color : color})
        ];
    }
    const cylinder = new THREE.Mesh(cylinderGeometry,material);
    cylinder.position.x = -200+locateX*50;
    cylinder.position.y = 10;
    cylinder.position.z = -200+locateY*50;
    cylinderSet = [cylinder, cylinderGeometry]
    return cylinderSet;
}

const colorPieceBlack = 0x402020;
const colorPieceWhite = 0x606060;

function drawPieceBlack(locateX,locateY,isKing){
    var cylinderSet = drawCylinder(locateX,locateY,colorPieceBlack,isKing);
    return cylinderSet;
}
function drawPieceWhite(locateX,locateY,isKing){
    var cylinder,cylinderGeometry = drawCylinder(locateX,locateY,colorPieceWhite,isKing);
    return cylinder, cylinderGeometry;
}
var i = 0;
var piecesBlackSet = [];
for(let j=0;j<8;j++){
    for(let k=0;k<3;k++){
        if(((j%2 == 0)&(k%2 != 0))||((j%2 != 0)&(k%2 == 0))){
            piecesBlackSet[i] = drawPieceBlack(j,k);
            scene.add(piecesBlackSet[i][0]);
            i += 1;
            }
    }
}
i = 0;
var piecesWhiteSet = [];
for(let j=0;j<8;j++){
    for(let k=5;k<8;k++){
        if(((j%2 == 0)&(k%2 != 0))||((j%2 != 0)&(k%2 == 0))){
            piecesWhiteSet[i] = drawPieceWhite(j,k);
            scene.add(piecesWhiteSet[i][0]);
            i += 1;
            }
    }
}

//render 
renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);

document.getElementById("canvas1").appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);

"controls is used to control camera by mouse"
// // var controls = new THREE.OrbitControls(camera,renderer.domElement);
// controls.update();

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

// const focusPiece = drawSquare(0x550000);
// focusPiece.position.x = -200;
// focusPiece.position.y = 0.5;
// focusPiece.position.z = -200;
// scene.add(focusPiece);
// console.log(focusPiece.position.x)
// console.log(focusPiece.position.z)

// function start(){
//     focusPiece.position.x = -200;
//     focusPiece.position.y = 0.5;
//     focusPiece.position.z = -200;
// }

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
        // for(let i=0;i<12;i++){
        movePiece(piecesWhite[i],target);
    // }
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
    // moveArrowKey(piecesBlack[1]);
    // getInfo();
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

// edges
var pieceEdges0 = new THREE.EdgesGeometry(piecesBlackSet[2][1])
// var pieceEdges1 = new THREE.EdgesGeometry(piecesBlackSet[3][1])
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var plane = new THREE.Plane();
var pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
var planeIntersect = new THREE.Vector3(); // point of intersection with the plane
var pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
var shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
var isDragging = false;
var dragObject;
  // events
document.addEventListener("pointermove", event => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  if (isDragging) {
    raycaster.ray.intersectPlane(plane, planeIntersect);
    dragObject.position.addVectors(planeIntersect, shift);
  }
});

document.addEventListener("pointerdown", () => {
    // console.log("start:(",mouse.x,",",mouse.y,")");
    console.log("start",piecesBlackSet[0][0].position.x,",",piecesBlackSet[0][0].position.z)
    var setIntersects=[];
    for(let i=0;i<12;i++){
        setIntersects.push(piecesBlackSet[i][0])
    }
    var intersects = raycaster.intersectObjects(setIntersects);
    if (intersects.length > 0) {
        //   controls.enabled = false;
        pIntersect.copy(intersects[0].point);
        plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
        shift.subVectors(intersects[0].object.position, intersects[0].point);
        isDragging = true;
        dragObject = intersects[0].object;
    
  }
} );
function fixNumber(variable){
    // variable += 300
    fix1 = Math.floor(variable/50)
    if((variable-fix1*50) > 25){
        fix1 ++;
    }
    return (fix1*50)
}

function fixPosition(piece){
    piece.position.x = fixNumber(piece.position.x)
    piece.position.z = fixNumber(piece.position.z)
    var conditionOut = ((piece.position.x < -200)||(piece.position.x > 150)||(piece.position.z < -200)||(piece.position.z > 150))
    if(conditionOut){
        piece.position.x = 200;
        piece.position.z = 200;
    }
    posX = (piece.position.x+200)/50
    posY = (piece.position.z+200)/50
    if(((posX%2 == 0)&(posY%2 == 0))||((posX%2 != 0)&(posY%2 != 0))){
        console.log("out")
        return "out"
    } else {
    return piece;
}
}
document.addEventListener("pointerup", () => {
    isDragging = false;
    dragObject = null;
    for(let i=0;i<12;i++){
        piecesBlackSet[i][0] = fixPosition(piecesBlackSet[i][0]);
        // postData(piecesBlackSet[i][0],`pieceBlack${i}`);
        patchData(piecesBlackSet[i][0],`pieceBlack${i}`)
        console.log("finish ",i," ",piecesBlackSet[i][0].position.x,",",piecesBlackSet[i][0].position.z);
    }
// controls.enabled = true;
} );

function postData(piece,name){
    url = `http://localhost:5000/post/`;
    posX = (piece.position.x+200)/50
    posY = (piece.position.z+200)/50
    dataJsonPos = {piece:name, position:{posX:posX,posY:posY}}
    fetch(url,{
        method:'POST',
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
function patchData(piece,name){
    // url = `http://localhost:5000/post/60807df44bd4d33541164e1d`;
    url = `http://localhost:5000/post/${name}`;
    posX = (piece.position.x+200)/50
    posY = (piece.position.z+200)/50
    dataJsonPos = {piece:name,position:{posX:posX,posY:posY}}
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
})
}