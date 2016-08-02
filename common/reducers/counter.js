import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions';

export default function counter( state = 0, action ) {
	var num = 0;
	if ( state.posts ) {
		num = state.posts[0].id;
	} else {
		num = state;
	}
	switch(action.type) {
		case SET_COUNTER:
			return action.payload;
		case INCREMENT_COUNTER:
			return num + 1;
		case DECREMENT_COUNTER:
			return num - 1;
		default:
			return num;
	}
}
