song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload() {
    song = loadSound("Enemy.mp3");
}

function setup() {
    

    canvas = createCanvas(650, 600);
    canvas.center();
    //background("white");

    //changed the sequence of the video code **below the canvas
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); //spelling mistake poses
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 650, 600);

    fill("black");
    stroke("black");
   // circle(leftWristX, leftWristY, 25);    
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 25);
        volume_number = Number(leftWristY);
        console.log(volume_number);
        volume_floor = floor(volume_number);
        volume = volume_floor / 500;
        console.log(volume);
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume : " + volume;
    }
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist="+scoreleftWrist);//score  


        leftWristX = results[0].pose.leftWrist.x; //spelling mistake wrist
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("LeftWrist X = " + leftWristX + "LeftWristY = " + leftWristY +
                    "rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}

