import { CURRENT, PREV, NEXT, PLAYLIST } from '../actions/action_types';

const initial_state = {
	playlist: [],
	current_song: {},
	prev_song: {},
	next_song: {},
}

export default function songs_reducer (state = initial_state, action) {
	switch(action.type) {
		case PLAYLIST:
			return {
				...state,
				playlist: action.payload
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
