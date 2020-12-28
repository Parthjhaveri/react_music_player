import { CURRENT, PREV, NEXT, PLAYLIST, PREVIOUSLY_PLAYED } from '../actions/action_types';
const _ = require('lodash');

const initial_state = {
	playlist: [],
	previously_played: [],
	current_song: {},
	prev_song: {},
	next_song: {},
}

const check_previously_log = (state, action) => {
	let _state  = state;
	let _action = action;

	// If the current song is not in history array, push it
	if (_.some(_state, _action) === false) {
		_state.push(_action);
		return [..._state];
	} 
	
	// Else if the current song is in history array, erase it, then push it
	else if (_.some(_state, _action) === true) {
		_.remove(_state, _action);
		_state.push(_action);
		return [..._state];
	}

	console.log('STATE FROM REDUCER', _state);
}

export default function songs_reducer (state = initial_state, action) {
	switch(action.type) {
		case PLAYLIST:
			return {
				...state,
				playlist: action.payload
			}

		case PREVIOUSLY_PLAYED:
			return {
				...state,
				previously_played: check_previously_log(state.previously_played, action.payload)//[...state.previously_played, action.payload])
			}

		case CURRENT:
			return {
				...state,
				current_song: action.payload
			}

		case PREV:
			return {
				...state,
				prev_song: action.payload
			}

		case NEXT:
			return {
				...state,
				next_song: action.payload
			}

		default:
			return state;
	}
}
