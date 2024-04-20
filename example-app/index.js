
var pc = new RTCPeerConnection();
const v1 = document.getElementById("v1")

var start = () =>{
    navigator.mediaDevices.getUserMedia({video : true, audio : true})
    .then(stream => {
        attachVideo(v1, stream)
    })
    .catch(()=>{
        console.log("Here I am!!!")
    })
    var btn = document.getElementById('fuckyou')
    btn.style.zIndex = '0'
    v1.style.zIndex = '1'

}

var attachVideo = (videoTag, stream) =>{
    videoTag.srcObject = stream;
}
