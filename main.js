img="";
status="";
objects= [];

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetecter = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects"; 
}

function preload() {
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(img,0,0,640,420);
   if(status != "")
   {
       for(i = 0; i < objects.length; i++)
       {
        document.getElementById("status").innerHTML = "Status: Object Detected"; 

        fill("green")
        percent = floor (objects [i].confidence * 100);
        text(objects[i].label + "" + percent + "%" + objects[i].x, objects[i].y);
        noFill();
        stroke("green");
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
       }
   }

}

function modelLoaded() {
    console.log("Succses!");
    status = true;
    objectDetecter.detect(img,gotResult);
}

function gotResult(error,result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = results;
}