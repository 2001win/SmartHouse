
const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 1,  // reduce input image size .
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.6,      // ioU threshold for non-max suppression
    scoreThreshold: 0.7,    // confidence threshold for predictions.
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia ; 
console.log(navigator.getUserMedia)
let model ; 
const video = document.querySelector('.video');
console.log(video)
handTrack.startVideo(video).then(
    status => {
        if(status){
            navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 }},stream => {
                video.srcObject = stream;
                console.log(stream)
                setInterval(detection,600);
            },err => console.log(err))
            
        }
    }
)
const detection = () => {
    model.detect(video).then(predict => {
        if(predict.length>1){
            console.log(predict)
            const handCoordinate = predict[0].bbox; 
            console.log("x " + handCoordinate[0]);
            console.log("y " + handCoordinate[1])
        }
        else {
            console.log("Can not find your hand")
        }
    })
}
handTrack.load(modelParams).then(loadModel =>{
    model = loadModel;
})