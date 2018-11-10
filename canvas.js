var canvas,
    context,
    dragging = false,
    dragStartLocation,
    snapshot,plots=[],
    image_source;



let base64;
let change_background;
let clear_canvas;
//get the coordinates of current position of our mouse
function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;
        shape =document.querySelector('input[type="radio"][name="shape"]:checked').value;
        if(shape=="eraser")
             plots.push({x: x, y: y});
      else if(shape == 'free')
             plots.push({x: x, y: y});
         else
            return {x: x, y: y};
}
// take snapshot of our current state
function takeSnapshot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}
//restore the previous state
function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}
//function to draw line
function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}
//function to draw free line
function FreeLine() {
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
//funcion to draw circle
function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
}
//function to draw polygon
function drawPolygon(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
}

function draw(position) {

    var fillBox = document.getElementById("fillBox"),
        shape = document.querySelector('input[type="radio"][name="shape"]:checked').value,
        polygonSides = document.getElementById("polygonSides").value,
        polygonAngle = document.getElementById("polygonAngle").value;

    context.lineCap = "round";
    if(shape =="eraser")
    {
        var canvasColor = document.getElementById("backgroundColor").value;
        context.strokeStyle = canvasColor;
        context.lineWidth =  document.getElementById("eraser_size").value,
        document.getElementById("fillBox").checked = false;
        FreeLine(position);
    }

    if(shape =="free")
    {
        FreeLine(position);
        context.strokeStyle = document.getElementById("strokeColor").value;
        context.lineWidth =  document.getElementById("lineWidth").value;
    }

    if (shape === "circle") {
        drawCircle(position);
        context.strokeStyle = document.getElementById("strokeColor").value;
        context.lineWidth =  document.getElementById("lineWidth").value;
    }
    if (shape === "line") {
        drawLine(position);
        context.strokeStyle = document.getElementById("strokeColor").value;
        context.lineWidth =  document.getElementById("lineWidth").value;
    }

    if (shape === "polygon") {
        drawPolygon(position, polygonSides, polygonAngle * (Math.PI / 180));
        context.strokeStyle = document.getElementById("strokeColor").value;
        context.lineWidth =  document.getElementById("lineWidth").value;
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}
//function when user click the mouse
function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapshot();
}
//function when user move the mouse
function drag(event) {
    var position;
    if (dragging === true) {

        var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;

        if (shape == "free"){

            base64 = canvas.toDataURL("image/png");
            var myObj = {name: "draw",  todo: base64};
            var myJSON = JSON.stringify(myObj);


            ws.send(myJSON);
        }

        restoreSnapshot();
        position = getCanvasCoordinates(event);
        draw(position, "polygon");
    }
}
//function when user release the mouse key
function dragStop(event) {
    dragging = false;

    base64 = canvas.toDataURL("image/png");

    var myObj = {name: "draw",  todo: base64};
    var myJSON = JSON.stringify(myObj);

    ws.send(myJSON);

    restoreSnapshot();
    var position = getCanvasCoordinates(event);
    draw(position, "polygon");
}
//to change width of line
function changeLineWidth() {
    context.lineWidth = this.value;
    event.stopPropagation();
}
//change color inside the figure
function changeFillStyle() {
    context.fillStyle = this.value;
    event.stopPropagation();
}
//change color of line
function changeStrokeStyle() {
    context.strokeStyle = this.value;
    event.stopPropagation();
}
//change background color of canvas
function changeBackgroundColor() {


    change_background = document.getElementById("backgroundColor").value;
    var myObj = {name: "change_background",  todo: change_background};
    var myJSON = JSON.stringify(myObj);

    ws.send(myJSON);

    context.save();
    context.fillStyle = document.getElementById("backgroundColor").value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}
//implementation of eraser
function eraseCanvas() {

    clear_canvas = true;


    canvasColor = document.getElementById("backgroundColor").value;

    var myObj = {name: "clear_canvas",  todo: canvasColor};
    var myJSON = JSON.stringify(myObj);

     ws.send(myJSON);

    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("canvas").style.backgroundColor = canvasColor;
}
//load all the events when user laod the page
function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    var lineWidth = document.getElementById("lineWidth"),
        fillColor = document.getElementById("fillColor"),
        strokeColor = document.getElementById("strokeColor"),
        canvasColor = document.getElementById("backgroundColor");
        clearCanvas = document.getElementById("clearCanvas");

    context.strokeStyle = strokeColor.value;
    context.fillStyle = fillColor.value;
    context.lineWidth = lineWidth.value;


    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener("input", changeLineWidth, false);
    fillColor.addEventListener("input", changeFillStyle, false);
    strokeColor.addEventListener("input", changeStrokeStyle, false);
    canvasColor.addEventListener("input", changeBackgroundColor, false);
    clearCanvas.addEventListener("click", eraseCanvas, false);
}
//this event start when user press CTRL V on canvas
function retrieveImageFromClipboardAsBlob(pasteEvent, callback){
    if(pasteEvent.clipboardData == false){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    var items = pasteEvent.clipboardData.items;

    if(items == undefined){
        if(typeof(callback) == "function"){
            callback(undefined);
        }
    };

    for (var i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        var blob = items[i].getAsFile();

        if(typeof(callback) == "function"){
            callback(blob);
        }
    }
}
//add paste event on whiteboard
window.addEventListener("paste", function(e){

    // Handle the event
    retrieveImageFromClipboardAsBlob(e, function(imageBlob){

        base64 = canvas.toDataURL("image/png");

        var myObj = {name: "image",  todo: base64};
        //var myObj = {name: "image",  todo: img.src};
        var myJSON = JSON.stringify(myObj);

        ws.send(myJSON);
        // If there's an image, display it in the canvas
        if(imageBlob){
            
            // Create an image to render the blob on the canvas
            var img = new Image();

            // Once the image loads, render the img on the canvas
            img.onload = function(){
                // Update dimensions of the canvas with the dimensions of the image
               

                // Draw the image
                context.drawImage(img, 0, 0);
            };

            // Crossbrowser support for URL
            var URLObj = window.URL || window.webkitURL;

            // Creates a DOMString containing a URL representing the object given in the parameter
            // namely the original Blob
            img.src = URLObj.createObjectURL(imageBlob);
            image_source = img.src;


        }
    });
}, false);


window.addEventListener('load', init, false);


//WEBSOCKET
let ws = new WebSocket("ws://192.168.43.105:8080/socket");

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
    var Obj = JSON.parse(evt.data);


    if (Obj.name == "clear_canvas") {

        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("canvas").style.backgroundColor = Obj.todo;
        //clear_canvas = false;

    } else if (Obj.name == "change_background") {

        console.log("change_background")
        context.save();
        context.fillStyle = Obj.todo;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

    } else if (Obj.name == "image") {
        let image = new Image();
        image.onload = function () {
            context.drawImage(image,0,0);
        };
        image.src = Obj.todo;

    }else {
        let image = new Image();
        image.onload = function () {
            context.drawImage(image,0,0);
        };
        image.src = Obj.todo;
    }

};

ws.onclose = function () {
    // websocket is closed.
    console.log("Connection is closed...");
};

ws.onerror = function (evt) {
    console.log(evt)
}