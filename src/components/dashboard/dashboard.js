import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { playlist, previously_played, current, prev, next, current_element } from '../../redux/actions/actions';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls/controls.js';
import InfoWidget from '../global/info-widget/info_widget.js';

const Dashboard = (props) => {

	const [playing_track, set_playing_track] = useState({}); // CURRENTLY PLAYING SONG
	
	// ON CURRENT TRACK UPDATE, SET THE CURRENTLY PLAYING TRACK DATA TO STATE, KEEPING IT GENERIC
	useEffect(() => {		
		set_playing_track({track: props.current_track.track, url: props.current_track.url});		
	}, [props.current_track]);

	// SHOW PREVIOUS SONG
	const show_previous = () => {	
		console.log('PREVIOUSLY PLAYED', props.previously_played_songs);

		for (var i = props.previously_played_songs.length - 1; i >= 0; i--) {			

			// PUSH IN PREVIOUSLY PLAYED LOG
			props.previously_played(props.previously_played_songs[i]);

			// SET AS CURRENTLY PLAYING GENERIC STATE VARIABLE
			set_playing_track({track: props.previously_played_songs[i].track, url: props.previously_played_songs[i].url});
		}
	}

	// SHOW NEXT SONG
	const show_next = () => {				
		// LOOP OVER PLAYLIST AND SET NEXT SONG
		for (let i = 0; i < props.all_songs.length; i++) {			
			if (((props.current_track.url.localeCompare(props.all_songs[i].url)) === 0)) {				
				
				// SET AS CURRENT IN REDUX STORE
				props.current(props.all_songs[i + 1]);				

				// PUSH IN PREVIOUSLY PLAYED LOG
				props.previously_played(props.current_track);

				// SET AS CURRENTLY PLAYING GENERIC STATE VARIABLE
				set_playing_track({track: props.all_songs[i + 1].track, url: props.all_songs[i + 1].url});
			}
		}
	}

    return (
    	<aside className='sec-std' id='main-dashboard'>			
			<InfoWidget track_name={playing_track.track}/>
			<ControlsWidget url={playing_track.url} show_previous={show_previous} show_next={show_next} />
    	</aside>
    )
}

const mapStateToProps = (state) => {	
	return {
		current_track: state ? state.songs.current_song : null,
		previously_played_songs: state ? state.songs.previously_played : null,
		all_songs: state ? state.songs.playlist : null
	}
}

export default connect(mapStateToProps, {current, previously_played})(Dashboard);