import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls/controls.js';
import InfoWidget from '../global/info-widget/info_widget.js';

const Dashboard = (props) => {

	const [playing_track_name, set_playing_track_name] = useState(''); // CURRENTLY PLAYING SONG
	const [playing_track_url, set_playing_track_url] = useState(''); // CURRENTLY PLAYING SONG
	
	const [previous_song_name, set_previous_song_name] = useState('');
	const [previous_song, set_previous_song] = useState('');

	// ON CURRENT TRACK UPDATE, SET THE CURRENTLY PLAYING TRACK DATA TO STATE, KEEPING IT GENERIC
	useEffect(() => {		
		set_playing_track_name(props.current_track.track);		
		set_playing_track_url(props.current_track.url);
	}, [props.current_track]);

	const show_previous = () => {	
		console.log('PREVIOUSLY PLAYED SONGS ', props.previously_played);

		// LOOP OVER THE ARRAY OF PREVIOUSLY PLAYED SONGS FROM THE END IN REVERSE ORDER
		for (var i = props.previously_played.length - 1; i > 0; i--) {			

			// IF THE CURRENT SONG PLAYING EQUALS THE SAME AS THE VERY LAST ELEMENT IN THE 
			// 'PREVIOUSLY PLAYED' LOG, PLAY THE SONG RIGHT BEFORE IT (HENCE THE - 2)
			if ((props.current_track.url.localeCompare(props.previously_played[i].url)) === 0) {

				// SAVE THE PREVIOUS SONG URL IN STATE TO SET AS CURRENT LATER
				set_previous_song(props.previously_played[props.previously_played.length - 2].url);

				// SAVE THE PREVIOUS SONG NAME IN STATE TO SET AS CURRENT LATER
				set_previous_song_name(props.previously_played[props.previously_played.length - 2].track);
			}
		}
		
	}

	// WHEN THE 'PREV' BUTTON IS CLICKED, SET THE PREVIOUS SONG DATA = TO THE 
	// CURRENTLY PLAYING SONG DATA, SO WE CAN USE THE GENERIC STATE VARIABLE TO PASS IN AS PROPS TO
	// OUR CHILD COMPONENTS, ONE OF WHICH IS SOLELY PRESENTATIONAL (CONTROLS WIDGET)
	useEffect(() => {		
		set_playing_track_name(previous_song_name);		
		set_playing_track_url(previous_song);
	}, [previous_song]);

    return (
    	<aside className='sec-std' id='main-dashboard'>			
			<InfoWidget track_name={playing_track_name}/>
			<ControlsWidget url={playing_track_url} show_previous={show_previous} />
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