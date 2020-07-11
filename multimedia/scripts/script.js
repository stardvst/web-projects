var videoElem = document.querySelector('video');
videoElem.audioTracks.onaddtrack = function(event) {
    console.log(event.track);
};
