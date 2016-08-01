import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';

import configureStore from '../common/store/configureStore';
import routes from '../server/route';

const preloadState = window.__PRELOADED_STATE__;
const store = configureStore(preloadState);
const rootElement = document.getElementById('app');

render(
	<Provider store={store}>
		<Router history={hashHistory}>
			{routes}
		</Router>
	</Provider>,
	rootElement
);
