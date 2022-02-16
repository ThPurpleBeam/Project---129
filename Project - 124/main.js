song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
righttWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status="";
song2_status="";
function preload()
{
    song1=loadSound("Music2.mp3");
    song2=loadSound("Music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
// Intializing Pose Net
    poseNet = ml5.poseNet(video, modalLoaded);
// Exectuing Pose Net
    poseNet.on('pose', gotPoses);
}

function modalLoaded()
{
    console.log('Pose Net is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    song2.stop();
    if(song1_status==false)
    {
        song1.play();
        document.getElementById("song").innerHTML="Playing - Super Mario ";
    }
}
if(scoreLeftWrist > 0.2)
{
    circle(lefttWristX, leftWristY, 20);
    song1.stop();
    if(song2_status==false)
    {
        song2.play();
        document.getElementById("song").innerHTML="Playing Harry Potter ";
    }
}
    InNumberleftWristY = Number(leftWristX);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song1.setVolume(volume);
    }

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("lestWristX = " + leftWristX +" leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY  = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY);
    }
}
