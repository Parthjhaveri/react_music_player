import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls/controls.js';
import InfoWidget from '../global/info-widget/info_widget.js';

const Dashboard = (props) => {

	const [previous_song_name, set_previous_song_name] = useState('');
	const [previous_song, set_previous_song] = useState('');

	const show_previous = () => {	
		console.log('PREVIOUSLY PLAYED SONGS ', props.previously_played);

		for (var i = props.previously_played.length - 1; i > 0; i--) {			

			if ((props.current_track.url.localeCompare(props.previously_played[i].url)) === 0) {
				set_previous_song(props.previously_played[i - 1].url);
				set_previous_song_name(props.previously_played[i - 1].track);
			}
		}
		
	}

	useEffect(() => {
		console.log('PREVIOUS SONG URL ', previous_song);
		console.log('PREVIOUS SONG name ', previous_song_name);
	}, [previous_song]);

    return (
    	<aside className='sec-std' id='main-dashboard'>			
			<InfoWidget track_name={props.current_track}/>
			<ControlsWidget url={props.current_track.url} show_previous={show_previous} />
    	</aside>
    )
}

const mapStateToProps = (state) => {	
	return {
		current_track: state.songs.current_song,
		previously_played: state ? state.songs.previously_played : null
	}
}

export default connect(mapStateToProps, null)(Dashboard);