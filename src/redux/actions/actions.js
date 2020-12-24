import { PLAYLIST, PREVIOUSLY_PLAYED, CURRENT, PREV, NEXT, CURRENT_ELEMENT } from './action_types';

export const playlist = data => ({
	type: PLAYLIST,
	payload: data
});

export const previously_played = data => ({
	type: PREVIOUSLY_PLAYED,
	payload: data
});

export const current = data => ({
	type: CURRENT,
	payload: data
});

export const prev = data => ({
	type: PREV,
	payload: data
});

export const next = data => ({
	type: NEXT,
	payload: data
});

export const current_element = data => ({
	type: CURRENT_ELEMENT,
	payload: data
});