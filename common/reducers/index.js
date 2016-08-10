import { combineReducers } from 'redux';
import counter from './counter';
import postList from './postList';
import siteRoot from './siteRoot';
import pageNo from './pageNo';
import search from './search';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	counter,
	postList,
	siteRoot,
	pageNo,
	search,
	routing: routerReducer
});

export default rootReducer;
