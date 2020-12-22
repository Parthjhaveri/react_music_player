import { CURRENT_ELEMENT } from '../actions/action_types';

const initial_state = { info_widget_id: ''};

export default function ui_reducer (state = initial_state, action) {
	switch (action.type) {		
		case CURRENT_ELEMENT:
			return {
				...state,
				info_widget_id: action.payload
			};

		default:
			return state;
	}
}
