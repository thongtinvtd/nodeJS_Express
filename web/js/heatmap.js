function drawLine(){
    var canvas = document.getElementById("canvasHeatmap");
    var context = canvas.getContext("2d");
    context.strokeStyle = "#02ff02";
    context.lineWidth = 5;

    context.beginPath()
    context.moveTo(20, 0);
    context.lineTo(320, 640);
    context.stroke();

    context.beginPath()
    context.moveTo(320, 640);
    context.lineTo(47, 360);
    context.stroke();

    context.beginPath()
    context.moveTo(47, 360);
    context.lineTo(650,0);
    context.stroke();
}
drawLine();
