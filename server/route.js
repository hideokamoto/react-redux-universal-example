import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RouterLayout from '../common/containers/RouterLayout';
import Main from '../common/containers/Main';
import Post from '../common/containers/Post';

export default (
	<Route path='/' component={RouterLayout}>
		<Route path='/:slug' component={Post} />
		<Route path='/page/:pageNo' component={Main} />
		<IndexRoute component={Main} />
	</Route>
)
