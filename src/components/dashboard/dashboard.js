import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls.js';
import InfoWidget from '../global/info_widget.js';

const Dashboard = (props) => {
    return (
    	<aside className='sec-std' id='main-dashboard'>			
			<InfoWidget track_name={props.current_track}/>
			<ControlsWidget url={props.current_track.url} />
    	</aside>
    )
}

const mapStateToProps = (state) => {	
	return {
		current_track: state.songs.current_song
	}
}

export default connect(mapStateToProps, null)(Dashboard);