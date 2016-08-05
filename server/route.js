import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RouterLayout from '../common/containers/RouterLayout';
import Sample from '../common/containers/Sample';
import Post from '../common/containers/Post';

export default (
	<Route path='/' component={RouterLayout}>
		<Route path='/:slug' component={Post} />
		<IndexRoute component={Post} />
	</Route>
)
