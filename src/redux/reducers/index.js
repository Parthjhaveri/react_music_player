import { combineReducers } from 'redux';
import songs_reducer from './songs_reducer.js';
import ui_reducer from './ui_reducer.js';

const reducers = combineReducers({
	songs: songs_reducer,
	ui: ui_reducer
});

export default reducers;