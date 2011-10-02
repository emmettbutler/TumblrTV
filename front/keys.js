var playNext = function() {
    // define play next here...
}

var playPrevious = function() {
    // define play previous here...
}

var pausePlayback = function() {
    // define pause here...
}

var resumePlayback = function() {
    // define play here...
}

var volumeUp = function() {
    // define volume up here...
}

var volumeDown = function() {
    // define volume down here...
}



boxee.onMouseMoveUp()    = volumeUp;
boxee.onMouseMoveDown()  = volumeDown;
boxee.onMouseMoveLeft()  = playPrevious;
boxee.onMouseMoveRight() = playNext;
boxee.onMouseClick()     = pausePlayback;

boxee.onKeyboardKeyUp()    = volumeUp;
boxee.onKeyboardKeyDown()  = volumeDown;
boxee.onKeyboardKeyLeft()  = playPrevious;
boxee.onKeyboardKeyRight() = playNext;
boxee.onKeyboardKeyEnter() = pausePlayback;