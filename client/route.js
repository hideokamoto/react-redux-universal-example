import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import ClientLayout from '../common/containers/ClientLayout';
import App from '../common/containers/App';
import Sample from '../common/containers/Sample';
import Post from '../common/containers/Post';

export default (
	<Route path='/' component={ClientLayout}>
		<Route path='/sample' component={Sample} />
		<Route path='/:slug' component={Post} />
	</Route>
);
