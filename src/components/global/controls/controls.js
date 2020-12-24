import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss'

const ControlsWidget = (props) => { 

	const show_previous = () => {
		console.log('PREVIOUSLY PLAYED SONGS', props);
	}

    return (
    	<aside>
		    <AudioPlayer
			    autoPlay
			    src={props.url}
			    showSkipControls={true}
			    showJumpControls={false}
			    onClickPrevious={show_previous}
			/>		
    	</aside>
    )
}

const mapStateToProps = (state) => {	
	return {
		previously_played: state ? state.songs.previously_played : null
	}
};

export default connect(mapStateToProps, null)(ControlsWidget);
