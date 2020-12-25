import { CURRENT, PREV, NEXT, PLAYLIST, PREVIOUSLY_PLAYED } from '../actions/action_types';
import { map, tail, times, uniq } from 'lodash';

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

	let index = _state.map((item) => item.url).indexOf(_action.url);
	
	if (index > -1) {
		_state.splice(index, 1, _action);
		return _state;
	}
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
				previously_played: check_previously_log([...state.previously_played, action.payload], action.payload)//[...state.previously_played, action.payload]
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
