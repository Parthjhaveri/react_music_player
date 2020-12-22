import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss'

const ControlsWidget = () => { 

    return (
    	<aside>
		    <AudioPlayer
			    autoPlay
			    src="https://freeplaymusic.com/#/music/18361"
			    onPlay={e => console.log("onPlay")}			    
			/>		
    	</aside>
    )
}

export default ControlsWidget;
