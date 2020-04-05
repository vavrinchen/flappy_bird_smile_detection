var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bird;
bird = new Bird(cvs, ctx);
var pipes = []
pipes.push(new Pipe(cvs, ctx))

const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  
}
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    const happy_value = resizedDetections[0].expressions['happy'];
    if (happy_value > 0.7) {
      bird.up()
      // console.log("happy_value: ", happy_value)
    }
  }, 100)
})


function draw() {

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show()
    pipes[i].update()
    if (pipes[i].x < 0) {
      pipes.push(new Pipe(cvs, ctx))
    }
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (pipes[i].hit(bird)) {
      console.log("collision")
      // location.reload(); // reload the page
    }
  }
  bird.update()
  bird.show()
  
  requestAnimationFrame(draw);
}

draw()