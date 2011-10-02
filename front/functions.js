function findClosest(id, increasing) {
    var step = increasing ? 1 : -1;
    for(var i=id+step; i>=0 && i<=playlist.length; i+=step)
        if( playlist[id] )
            return id;
}

function playNext(id) {
    megaplaya.api_nextVideo();
		return findClosest(id, true);
}

function playPrevious(id) {
		return findClosest(id, false);
}


function getYouTubeVideo(ytid) {
		autoplay  = 1; // start playing when loaded
		controls  = 0; // hide player chrome. we'll handle all controls
		disablekb = 1; // turn off youtube default keyboard controls
		enablejsapi = 1; 
}
