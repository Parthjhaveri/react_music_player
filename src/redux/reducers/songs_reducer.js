import { CURRENT, PREV, NEXT, PLAYLIST, PREVIOUSLY_PLAYED } from '../actions/action_types';

const initial_state = {
	playlist: [],
	previously_played: [],
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

		case PREVIOUSLY_PLAYED:
			return {
				...state,
				previously_played: [...state.previously_played, action.payload]
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
