<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Canvas</title>
    <link href="canvas.css" rel="stylesheet">
    <script src="canvas.js"></script>
</head>

<body>
<canvas id="canvas" width="700" height="600"></canvas>

<div id="controls">
    <p><label>Fill: <input id="fillBox" type="checkbox" ></label></p>

    <div class="lightBorder">
        <p><label>Fill Color: <input id="fillColor" type="color" value="#24B0D5"></label></p>
        <p><label>Canvas Color: <input id="backgroundColor" type="color" value="#FFFFFF"></label></p>
        <p><label>Stroke Color: <input id="strokeColor" type="color"></label></p>
    </div>

    <div class="lightBorder">
        <p><label>Line width: <input id="lineWidth" type="range" step="1" min="1" max="200" value="2"></label></p>


        <div class="lightBorder">
            <p><input type="radio" name="shape" value="line" >Line</p>
            <p><input type="radio" name="shape" value="circle" checked="checked">Circle</p>
            <p><input type="radio" name="shape" value="polygon">Polygon</p>
            <p><input type="radio" name="shape" value="free" >Free Drawing</p>
            <p><input type="radio" name="shape" value="eraser">eraser</p>
        </div>

        <p><label>Polygon Sides: <input id="polygonSides" type="range" step="1" min="3" max="10"></label></p>
        <p><label>Polygon Angle: <input id="polygonAngle" type="range" step="22.5" min="0" max="90"></label></p>
        <p><label>Eraser Size: <input id="eraser_size" type="range" step="3" min="6" max="30"></label></p>

        <p><input id="clearCanvas" type="button" value="Clear Canvas"></p>

    </div>

</body>
</html>