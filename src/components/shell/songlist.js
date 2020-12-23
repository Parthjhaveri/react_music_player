import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { playlist, current, prev, next, current_element } from '../../redux/actions/actions';

// IMPORT WIDGETS AND PLAYLIST
import song_playlist from '../../data/playlist.js';
import InfoWidget from '../global/info_widget';
	
const SongList = (props) => {

	// ALL PLAYLIST SONGS
	const [songs, set_songs] = useState([]);

	// ON PROPS UPDATE, DISPATCH TO STORE AND SET COMPONENT STATE
	useEffect(() => {
		props.playlist(song_playlist); // DISPATCH TO REDUX STORE
		set_songs(props.all_songs); // SET COMPONENT STATE
	}, [props]);

    return (
    	<aside className='sec-std' id='song-list'>
    		<h1>Song List</h1>
    		{	
    			// MAP OVER ALL SONGS FROM COMPONENT STATE AND PASS PROPS INTO PRESENTATIONAL COMPONENT
    			songs.map((el, idx) => {
    				return <InfoWidget 
    					key={idx}                        
    					{...el}
    				/>
    			})
    		}            
    	</aside>
    )
}

const mapStateToProps = (state) => {	
	return {
		all_songs: state ? state.songs.playlist : null
	}
};

export default connect(mapStateToProps, { playlist })(SongList);