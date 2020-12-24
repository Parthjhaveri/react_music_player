import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss'

const ControlsWidget = (props) => {

    return (
    	<aside>
		    <AudioPlayer
			    autoPlay
			    src={props.url}
			    showSkipControls={true}
			    showJumpControls={false}
			    onClickPrevious={props.show_previous}
			/>		
    	</aside>
    )
}

export default ControlsWidget;