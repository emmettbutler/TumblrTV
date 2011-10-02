function findClosest(id, increasing) {
    var step = increasing ? 1 : -1;
    for(var i=id+step; i>=0 && i<=playlist.length; i+=step)
        if( playlist[id] )
            return playlist[id];
}

function getNext(id) {
		curr_post = findClosest(id, true);
		play(curr_post);
}

function getPrevious(id) {
		curr_post findClosest(id, false);
		play(curr_post);
}

function play(post) {
		$(post.url).embedly({
				key:':531a832eec9e11e0bd394040d3dc5c07',
				wmode: 'window',
				autoplay: true,
				success: function(oembed, dict){
            alert(oembed.title);
        });
		});
}


/* return the youtube video object */
/* will be replaced by embedly */
function getYouTubeVideo(ytid) {
		autoplay  = 1; // start playing when loaded
		controls  = 0; // hide player chrome. we'll handle all controls
		disablekb = 1; // turn off youtube default keyboard controls
		enablejsapi = 1; // youtube javascript api
}

function getVimeoVideo(vimeoid) {

}
