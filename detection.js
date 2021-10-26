let detections = {};
 
let isSuccess = 0 ;
const videoElement = document.getElementById('video');
const canvasImg = document.querySelector('.myCanvas');
const clickBtn = document.querySelector('.video__btn');
const textNotify = document.querySelector('.videoBox__notify');
console.log(textNotify)
let countDetect = 0 ;
 
const hands = new Hands({
  locateFile: file => {
    return `https://c...content-available-to-author-only...r.net/npm/@mediapipe/hands/${file}`;
  },
});
 
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
 
hands.onResults(gotHands);
 
function gotHands(results) {
  detections = results;
  let {multiHandLandmarks} = results;
  let arr = multiHandLandmarks[0];
  if(arr){
  //  console.log(arr[4],'8',arr[8],arr[12],arr[16],arr[20])
    isSuccess =   handInbox([arr[4],arr[8],arr[12],arr[16],arr[20]])
    countDetect +=1 ; 
 
  }
  else {
 
    countDetect = 0 ;
  }
}
 
const  drawCanvas = (canvas, img) => {
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
 
  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  console.log(ratio,x,y)
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.width=400 ; 
  canvas.height=400;
  canvas.getContext('2d').drawImage(img, 480, 0, 200, 230,
      0, 0, img.width * ratio, img.height * ratio);
  console.log(canvas.getContext('2d').getImageData(480, 0, 200, 230))
 
};
 
console.log(window.location);
 
const camera = new Camera(videoElement, {
  onFrame: async () => {
    const track = await videoElement.srcObject.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
 
    imageCapture.grabFrame()
      .then(imageBitmap => {
        //console.log(countDetect)
        console.log(imageBitmap)
        drawCanvas(canvasImg, imageBitmap);
        if(countDetect>20 && isSuccess===1){
          textNotify.textContent ='Success';
 
          countDetect = 0 ;
        }
      })
      .catch(error => console.log(error));
    await hands.send({image: videoElement});
  },
  width: 640,
  height: 480,
 
});
 
 
const handInbox = (arr) => {
  let check = 1 ; 
  arr.forEach((element)=>{
    if(element.y<0.1 || element.y>0.6){
 
      check = 0;
    } else if (element.x<0.6 || element.x>1){
      check = 0;
    }
  })
  if(check ==0) {
    console.log('Hand out of box');
  }
  if(check == 1) {
    console.log('Successfully')
  }
  return check ;
}
 
camera.start();
 
 
 
 
 
 
 
 
// // const btnYesHandler = (x) => {
// //   if (x>0.1 && x<0.25) {
// //     toggleBtnLight.style.opacity = 0.5;
// //     if(countDetect>30){
// //       detailBtnLight.textContent = detailBtnLight.textContent=='OFF'?'ON':'OFF';
// //       countDetect = 0 ; 
// //     }
// //   }
// //   else if (x>0.4 && x<0.65){
// //     toggleBtnFan.style.opacity = 0.5 ; 
// //     if(countDetect>30){
// //       detailBtnFan.textContent = detailBtnFan.textContent=='OFF'?'ON':'OFF';
// //       countDetect = 0 ; 
// //     }
// //   } 
// //   else if (x>0.8 && x<1){
// //     toggleBtnDoor.style.opacity = 0.5 ; 
// //     if(countDetect>30){
// //       detailBtnDoor.textContent = detailBtnDoor.textContent=='OFF'?'ON':'OFF';
// //       countDetect = 0 ;
// //     }
// //   }
// //   else {
// //     toggleBtnLight.style.opacity = 1; 
// //     toggleBtnFan.style.opacity = 1;
// //     toggleBtnDoor.style.opacity = 1;
// //     countDetect = 0 ;
// //   }
// // }
// // function onGrabFrameButtonClick() {
// //   imageCapture.grabFrame()
// //   .then(imageBitmap => {
// //     drawCanvas(canvas, imageBitmap);
// //   })
// //   .catch(error => console.log(error));
// // }