var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot,
    plots=[];

let base64;

function getCanvasCoordinates(event) {
    var x = event.offsetX || event.clientX - canvas.getBoundingClientRect().left,
        y = event.offsetY || event.clientY - canvas.getBoundingClientRect().top;
    plots.push({x: x, y: y});

}

function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}


function drawLine() {
    context.beginPath();
    context.moveTo(plots[0].x, plots[0].y);

    for(var i=1; i<plots.length; i++) {
        context.lineTo(plots[i].x, plots[i].y);
    }
    context.stroke();
    if(dragging==false)
    {
        plots =[];
    }

}

function dragStart(event) {
    dragging = true;
    getCanvasCoordinates(event);
    takeSnapshot();
}

function drag(event) {
    var position;
    if (dragging === true) {

        base64 = canvas.toDataURL("image/png");
        ws.send(base64);

        restoreSnapshot();
        getCanvasCoordinates(event);
        drawLine();
    }
}

function dragStop(event) {
    dragging = false;
    restoreSnapshot();
    getCanvasCoordinates(event);
    drawLine();
}

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'purple';
    context.fillStyle = 'yellow';
    context.lineWidth = 2;
    context.lineCap = 'round';

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
}


window.addEventListener('load', init, false);

//WEBSOCKET
let ws = new WebSocket("ws://172.24.25.187:8080/socket");

ws.onopen = function () {
    // Web Socket is connected, send data using send()
    ws.send("Message to send");
    console.log("Message is sent...");
};
/**
 *
 * @param evt
 */
ws.onmessage = function (evt) {
    //console.log(evt.data);
    let image = new Image();
    image.onload = function () {
        context.drawImage(image,0,0);
    };
    image.src = event.data;
};

ws.onclose = function () {
    // websocket is closed.
    console.log("Connection is closed...");
};

ws.onerror = function (evt) {
    console.log(evt)
}