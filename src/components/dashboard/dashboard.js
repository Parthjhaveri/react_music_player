import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { playlist, previously_played, current, prev, next, current_element } from '../../redux/actions/actions';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls/controls.js';
import InfoWidget from '../global/info-widget/info_widget.js';

const Dashboard = (props) => {

	const [playing_track, set_playing_track] = useState({}); // CURRENTLY PLAYING SONG
	
	const [previous_song_name, set_previous_song_name] = useState('');
	const [previous_song, set_previous_song] = useState('');

	let [counter, set_counter] = useState(1);

	// ON CURRENT TRACK UPDATE, SET THE CURRENTLY PLAYING TRACK DATA TO STATE, KEEPING IT GENERIC
	useEffect(() => {		
		set_playing_track({track: props.current_track.track, url: props.current_track.url});
		console.log('CURRENT TRACK', props.current_track);
	}, [props.current_track]);

	// WHEN THE 'PREV' BUTTON IS CLICKED, SET THE PREVIOUS SONG DATA = TO THE 
	// CURRENTLY PLAYING SONG DATA, SO WE CAN USE THE GENERIC STATE VARIABLE TO PASS IN AS PROPS TO
	// OUR CHILD COMPONENTS, ONE OF WHICH IS SOLELY PRESENTATIONAL (CONTROLS WIDGET)
	useEffect(() => {				
		set_playing_track({track: previous_song_name, url: previous_song});
	}, [previous_song]);

	// SHOW PREVIOUS SONG
	const show_previous = () => {	
		console.log('CURRENT TRACK (PREV BTN)', props.current_track);

		counter++;
		set_counter(counter);
		
		let prev_url = props.previously_played_songs[props.previously_played_songs.length - (counter)].url;
		let prev_track = props.previously_played_songs[props.previously_played_songs.length - (counter)].track

		console.log('PREVIOUS SONG ', prev_url, prev_track);

		set_playing_track({track: prev_track, url: prev_url});

		// SET CURRENT
		props.current(props.previously_played_songs[props.previously_played_songs.length - (counter)]);
		
	}

	// SHOW NEXT SONG
	const show_next = () => {		

		// LOOP OVER PLAYLIST AND SET NEXT SONG
		for (let i = 0; i < props.all_songs.length; i++) {			
			if ((props.current_track.url.localeCompare(props.all_songs[i].url)) === 0) {				
				
				// SET AS CURRENT IN REDUX STORE
				props.current(props.all_songs[i + 1]);				

				// PUSH IN PREVIOUSLY PLAYED LOG
				props.previously_played(props.all_songs[i + 1]);				

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