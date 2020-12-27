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

	useEffect(() => {		
		console.log(props.previously_played_songs);
	}, [props.previously_played_songs]);

	// SHOW PREVIOUS SONG
	const show_previous = () => {
		// If the current song is not in history array, push it
		for (var i = props.previously_played_songs.length - 1; i > 0; i--) {	
			props.previously_played(playing_track);
		}
	}

	// SHOW NEXT SONG
	const show_next = () => {				
		console.log(props);
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