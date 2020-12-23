import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { playlist, current, prev, next, current_element } from '../../redux/actions/actions';

const InfoWidget = (props) => { 
	
	// GET CURRENT SONG
	const current_song = () => {		
		// SEND UP TO REDUX STORE AS CURRENT, IMPORT CURRENT INTO DASHBOARD COMPONENT TO PASS TO CHILDREN
		props.current(props);
	}

    return (
    	<aside onClick={current_song}>
		    { props.artist ? <h1>{props.artist + ' - ' + props.track}</h1> : <h1>{props.track_name.track}</h1> }
		    { props.album ? <h1>{props.album}</h1> : null }
    	</aside>
    )
}

export default connect(null, { current })(InfoWidget);
