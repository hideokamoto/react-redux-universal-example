import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../common/store/configureStore';
import routes from '../server/route';

const preloadState = window.__PRELOADED_STATE__;
const store = configureStore(preloadState);
const rootElement = document.getElementById('app');
var history = syncHistoryWithStore(browserHistory, store);

match({history, routes}, (error,redirectLocation,renderProps) => {
	render(
		<Provider store={store}>
			<Router history={hashHistory} routes={routes}>
			</Router>
		</Provider>,
		rootElement
	);
})
