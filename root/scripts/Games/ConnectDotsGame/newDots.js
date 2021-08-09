
import numberJson from '../../../Assests/dotsGameResource/images_json/numbersJson.json';



const canvas = document.getElementById("dotsCanvas");
let resultArray;
let actualObject;
let score = 0;
let edges = 0;
let scaleofdevice = window.devicePixelRatio;

var data = { //global variable set equal to object
    canvas: null,
    ctx: null,
    clickedDot: null, //dot that was previously clicked--fromDot
    // dots: [{ x: 200, y: 200 }, { x: 300, y: 200 }, { x: 220, y: 150 }, { x: 280, y: 150 }, { x: 250, y: 100 }] // letter A //array-dots variable
        // dots2: [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 100, y: 200 }, { x: 200, y: 200 }] // shape rectangle
        dots:null,
        is_drawing : false, 
        draw_color :"blue",
        drawing_width : "2"
};

//Creating the array for the dots position
function dotsIndex(arg){
    
    let dots = [];
    let length = Object.keys(arg).length;
    for(let i = 1 ; i <= length;i++){
        let indexElement = 'v' + i.toString();
        var width = (arg[indexElement].cx/1920)*data.canvas.width, height = (arg[indexElement].cy/1080)*data.canvas.height;
        let index = {x:width, y:height };
        dots.push(index);
    }
    console.log(data.dots);
    return dots;

}

//initialize the dots
function initilizeDots(){
    let dotsNumber =1 //Math.floor(Math.random() * 5);
    console.log(dotsNumber);
    
     actualObject =numberJson; //numberJson[dotsNumber];
    
   data.dots = dotsIndex(numberJson[dotsNumber]);
    resultObject(dotsNumber);
   }
   

   //Creating a result object

   //creating the object that will hold result
function resultObject(number){
    resultArray = JSON.parse(JSON.stringify(numberJson[number]));
    let length = Object.keys(resultArray).length;
    for(let i = 1 ; i<=length ; i++){
        let indexElement = 'v' + i.toString();
        for(let j =1 ; j <=length ; j++){
            let indexElement2 = 'v' + j.toString();
            if( resultArray[indexElement][indexElement2] = 1) edges++;
            resultArray[indexElement][indexElement2] = 0;
        }
    }
}
//Drawing Dots
function drawDots() { //draws the dots on the screen
    var i = 0;
    for (; i < data.dots.length; i++) { //loop 
        var d = data.dots[i];
        //var width = (d.x/1920)*data.canvas.width;
        //var height = (d.y/1080)*data.canvas.height;
        data.ctx.beginPath(); //begin a new path
        data.ctx.arc(d.x, d.y, 15/scaleofdevice, 0, 2 * Math.PI); //arc(x position, y position, radius, arc start, arc end) --full circumference of circle
        data.ctx.fillStyle = '#28b485b6'; //grey color
        data.ctx.fill(); //add fill to see on screen--set fillstyle
        data.ctx.closePath(); //close the path
    }
}


function prepCanvas() { //setup resolution and size of canvas
    var res = window.devicePixelRatio || 1, //resolution
        scale = 1 / res;

        let canvasBg ="white";
    data.canvas = document.getElementById('dotCanvas'); //dots canvas
    data.ctx = data.canvas.getContext('2d'); //context
    data.ctx.fillStyle = "white";
    data.canvas.width =window.innerWidth - 60;
    data.canvas.height = 645;
    data.canvas.addEventListener("touchstart", start , false); 
    data.canvas.addEventListener("touchmove", draw , false); 
    data.canvas.addEventListener("mousedown", start , false); 
    data.canvas.addEventListener("mousemove", draw , false); 
    data.canvas.addEventListener("touchend",stop,false);
    data.canvas.addEventListener("mouseup",stop,false);
    data.canvas.addEventListener("mouseout",stop,false);
    // console.log(data.canvas.height);
    //data.ctx.scale(res, res);
    // data.canvas.addEventListener('mousedown', function(event) { //mousedown event listener(click mouse), will call a function which will call checkForDot function
    //     console.log(event.clientX,event.clientY);
    //     checkForDot(event);
    // });
}


function start(event){

data.is_drawing = true;
data.ctx.beginPath();
data.ctx.moveTo(event.clientX - data.canvas.offsetLeft,
                 event.clientY - data.canvas.offsetTop);
                

event.preventDefault();
}
function draw(event){
if(data.is_drawing){
    data.ctx.lineTo(event.clientX - data.canvas.offsetLeft,
        event.clientY - data.canvas.offsetTop);
data.ctx.strokeStyle = data.draw_color;
data.ctx.lineWidth = data.drawing_width;
data.ctx.lineCap = "round";
data.ctx.lineJoin = "round";
data.ctx.stroke();
}

event.preventDefault();
}


function stop(event){
    if(data.is_drawing){
        data.ctx.stroke();
        data.ctx.closePath();
        data.is_drawing = false;

    }
    event.preventDefault();
}


//Change the color of the drAWING
document.querySelectorAll('.color-button').forEach(item => {
    item.addEventListener('click', event => {
        data.draw_color = item.style.background;
    })
  })
  //Change the color through the color picker
  document.querySelectorAll('.color-picker').forEach(item => {
    item.addEventListener('input', event => {
        console.log(item.value);
        data.draw_color = item.value;
    })
  })
  //change the size of the lines
  document.querySelectorAll('.pen-range').forEach(item => {
    item.addEventListener('input', event => {
        console.log(item.value);
        data.drawing_width = item.value;
    })
  })


  //Clear the canvas

  document.getElementById('clearCanvas').addEventListener("click", function(){ 

   data.ctx.fillStyle = "rgb(221, 205, 205)";
    data.ctx.clearRect(0 , 0, data.canvas.width , data.canvas.height);
    data.ctx.fillRect(0 , 0, data.canvas.width , data.canvas.height);
    drawDots();

   });
function imagegenerate(){
    let canvas = document.getElementById("dotsCanvas");
let img = canvas.toDataURL("../../../images/ConnectDotsGame");
document.write('<img src="'+img+'"/>');
}
prepCanvas();
initilizeDots();
drawDots();