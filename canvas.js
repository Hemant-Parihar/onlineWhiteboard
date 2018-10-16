var canvas, context;



var dragging = false;
var dragStartLocation, snapshot;

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y : y};
}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}


function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function dragStart(event) {
    //console.log(getCanvasCoordinates(event));
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
    //console.log(dragStartLocation);
}

function drag(event) {
    //console.log(getCanvasCoordinates(event));
    var position;
    if (dragging == true) {
        restoreSnapshot();
        position = getCanvasCoordinates(event);
        drawLine(position);
    }

}

function dragStop(event) {
    //console.log(getCanvasCoordinates(event));
    dragging = false;
    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    drawLine(position);
    //console.log(position);
}

function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'purple';
    context.lineWidth = 4;
    //context.lineCap = 'round';


    // Now we will draw when we have three event.
    // 1. MouseDown 2. MouseMove 3. MouseUp

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
}

window.addEventListener('load', init, false);

console.log('hello');