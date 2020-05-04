// ml5 Face Detection Model
let faceapi;
let detections = [];
let isFace = false;

// Video
let video;

//Video1 and Video2
let video1 = document.getElementById("video1");
let video2 = document.getElementById("video2");
let video3 = document.getElementById("video3");

function setup() {
  
  //commented to hide canvas
  //createCanvas(360, 270);

  // Create the video and start face tracking
  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Only need landmarks for this example
  const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);

  //to hide webcam footage
  video.hide();
}

// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  
  if (detections.length > 0) {
    isFace = true
  }else{
    isFace = false;
  }

  faceapi.detect(gotFaces);
  // console.log(result);
}


// Draw everything
function draw() {

    
  if( isFace ){
    background(178, 50, 1);
    setVideoActive();
  }else{
    background(0);
    setVideoPassive();
  }

  // Just look at the first face and draw all the points
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
    
    for (let i = 0; i < points.length; i++) {
      stroke(161, 95, 251);
      strokeWeight(4);
      point(points[i]._x, points[i]._y);
    }

  }

  //hide startup video when it ends
  video3.onended = function() {
    hideStartupVideo();
};

}

function setVideoActive(){
  video1.classList.add("hidden");
  video1.pause();
  video2.play();
}

function setVideoPassive(){
    video1.classList.remove("hidden");
    video1.play();
    video2.pause();
    video2.currentTime = 0;
}

function hideStartupVideo(){
  video3.classList.add("hidden");
  video1.play();
}

// function keyPressed() {
//   if (keyCode === LEFT_ARROW) {
//     setVideoActive();
//   } else if (keyCode ===RIGHT_ARROW){
//     setVideoPassive();
//   }
// }