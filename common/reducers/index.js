import { combineReducers } from 'redux';
import counter from './counter';
import postList from './postList';
import siteRoot from './siteRoot';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	counter,
	postList,
	siteRoot,
	routing: routerReducer
});

export default rootReducer;
