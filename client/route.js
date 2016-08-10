import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import ClientLayout from '../common/containers/ClientLayout';
import Post from '../common/containers/Post';

export default (
	<Route path='/' component={ClientLayout}>
		<Route path='/:slug' component={Post} />
	</Route>
);
