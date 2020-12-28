import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { playlist, previously_played, current, prev, next, current_element } from '../../../redux/actions/actions';

const InfoWidget = (props) => { 
	
	// GET CURRENT SONG
	const current_song = () => {		
		// SEND UP TO REDUX STORE AS CURRENT, 
		// IMPORT CURRENT INTO DASHBOARD COMPONENT TO PASS TO CHILDREN
		props.current(props);

		// SEND CURRENT SONG UP TO REDUX STORE INTO THE 'PREVIOUSLY PLAYED' LOG...
		// IN THAT ARRAY, PLAY CURRENT ELEMENT - 1 (PREVIOUS) ON 'PREV' BUTTON PRESS
		props.previously_played(props);
	}

    return (
    	<aside className='my-md song-item' onClick={current_song}>
		    { props.artist ? <h1>{props.artist + ' - ' + props.track}</h1> : <h1>{props.track_name}</h1> }
		    { props.album ? <small><em>{props.album}</em></small> : null }
    	</aside>
    )
}

export default connect(null, { current, previously_played })(InfoWidget);
