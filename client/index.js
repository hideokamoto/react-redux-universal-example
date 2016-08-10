import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../common/store/configureStore';

const preloadState = window.__PRELOADED_STATE__;

const sample = {
	counter: 'dummy params from client/index.js'
}
import ClientRoot from './route';

const mergedState = Object.assign( preloadState, sample );
const store = configureStore(mergedState);
const rootElement = document.getElementById('client');
var history = syncHistoryWithStore(browserHistory, store);

match({ ClientRoot, history }, (error,redirectLocation,renderProps) => {
	render(
		<Provider store={store}>
			<Router history={hashHistory} routes={ClientRoot}>
			</Router>
		</Provider>,
		rootElement
	);
})
