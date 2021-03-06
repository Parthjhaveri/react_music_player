import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { playlist, previously_played, current, prev, next, current_element } from '../../redux/actions/actions';

// IMPORT COMPONENTS
import ControlsWidget from '../global/controls/controls.js';
import InfoWidget from '../global/info-widget/info_widget.js';

const Dashboard = (props) => {
	// LIBRARIES
	const _ = require('lodash');
	const {rando, randoSequence} = require('@nastyox/rando.js');

	const [playing_track, set_playing_track] = useState({}); // CURRENTLY PLAYING SONG

	const [is_checked, set_is_checked] = useState(); // SHUFFLE CHECK

	const [bg_image, set_bg_image] = useState('');

	// REFS
	const shuffle_cb = useRef(null); // CHECKBOX
	const main_dash = useRef(null); // DASHBOARD ELEMENT
	
	// ON CURRENT TRACK UPDATE, SET THE CURRENTLY PLAYING TRACK DATA TO STATE, KEEPING IT GENERIC
	useEffect(() => {		
		set_playing_track({track: props.current_track.track, url: props.current_track.url});			
	}, [props.current_track]);

	useEffect(() => {		
		if (props.previously_played_songs.length === 0) {
			shuffle_cb.current.disabled = true;
		} else {
			shuffle_cb.current.disabled = false;
		}
	}, [props.previously_played_songs]);

	// SHOW PREVIOUS SONG
	const show_previous = () => {		

		// IF THERE IS ONLY ONE SONG IN PREVIOUSLY PLAYED ARRAY
		if (props.previously_played_songs.length === 1) {			
			
			// INDEX OF THE CURRENTLY PLAYING SONG IN THE ALL SONGS ARRAY			
			let index_of_current = props.all_songs.findIndex(x => x.url === playing_track.url);			

			if (index_of_current === 0) {
				// PLAY THE LAST SONG IN THE PLAYLIST
				set_playing_track({track: props.all_songs[props.all_songs.length - 1].track, url: props.all_songs[props.all_songs.length - 1].url});
			}
			else if (index_of_current > 0) {				
				set_playing_track({track: props.all_songs[index_of_current - 1].track, url: props.all_songs[index_of_current - 1].url});
			}

		}
		
		else {
			console.log('PREVIOUSLY PLAYED', props.previously_played_songs);

			// If the current song is not in history array, push it
			for (var i = props.previously_played_songs.length - 1; i > 0; i--) {	
				props.previously_played(playing_track);
			}
			
			set_playing_track({track: props.previously_played_songs[props.previously_played_songs.length - 2].track, url: props.previously_played_songs[props.previously_played_songs.length - 2].url});
		}

	}

	// SHOW NEXT SONG
	const show_next = () => { 

		// INDEX OF THE CURRENTLY PLAYING SONG IN THE ALL SONGS ARRAY			
		let index_of_current = props.all_songs.findIndex(x => x.url === playing_track.url);				
		
		// IF CURRENT SONG IS THE LAST SONG PLAYING...					
		if (index_of_current === (props.all_songs.length - 1)) {
			// PLAY THE FIRST SONG IN THE PLAYLIST
			set_playing_track({track: props.all_songs[0].track, url: props.all_songs[0].url});

			// IF SHUFFLE ON
			if (is_checked) {								
				// SELECT RANDOMIZED ELEMENT THAT WAS NOT PREVIOUSLY PLAYED
				let random_url = randoSequence(props.all_songs)[0].value.url;
				let random_track = randoSequence(props.all_songs)[0].value.track;

				// ... SET URL AND TRACK
				set_playing_track({track: random_track, url: random_url});
			}		
		}

		else {
			// LOOP OVER PLAYLIST AND SET NEXT SONG
			for (let i = 0; i < props.all_songs.length; i++) {	

				// IF SHUFFLE ON
				if (is_checked) {
					console.log(true);
					
					// SELECT RANDOMIZED ELEMENT THAT WAS NOT PREVIOUSLY PLAYED
					let random_url = randoSequence(props.all_songs)[0].value.url;
					let random_track = randoSequence(props.all_songs)[0].value.track;

					// ... SET URL AND TRACK
					set_playing_track({track: random_track, url: random_url});
				}				

				else if (((playing_track.url.localeCompare(props.all_songs[i].url)) === 0)) {
					
					// SET AS CURRENT IN REDUX STORE
					props.current(props.all_songs[i + 1]);				

					// PUSH IN PREVIOUSLY PLAYED LOG
					props.previously_played(props.all_songs[i + 1]);				

					// SET AS CURRENTLY PLAYING GENERIC STATE VARIABLE
					set_playing_track({track: props.all_songs[i + 1].track, url: props.all_songs[i + 1].url});					
				}
			}

		}		

	}

	// ON SHUFFLE
	const on_shuffle = (e) => {		
		set_is_checked(e.target.checked);
	}

    return (
    	<aside className='sec-std' id='main-dashboard' ref={main_dash}>			
			<InfoWidget track_name={playing_track.track}/>
			{
				props.previously_played_songs.length > 0 ? 
				<ControlsWidget url={playing_track.url} show_previous={show_previous} show_next={show_next} /> :
				<h1>Select a Song from below...</h1>
			}			
			<h3>Shuffle <input onChange={on_shuffle} ref={shuffle_cb} type='checkbox' id='shuffle_checkbox' name='song_shuffle' value='Shuffle'/></h3>
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