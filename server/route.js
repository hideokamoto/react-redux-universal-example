import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RouterLayout from '../common/containers/RouterLayout';
import Main from '../common/containers/Main';

export default (
	<Route path='/' component={RouterLayout}>
		<Route path='/:slug' component={Main} />
		<IndexRoute component={Main} />
	</Route>
)
