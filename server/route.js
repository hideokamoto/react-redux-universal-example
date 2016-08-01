import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RouterLayout from '../common/containers/RouterLayout';
import App from '../common/containers/App';

export default (
	<Route path='/' component={RouterLayout}>
		<IndexRoute component={App} />
	</Route>
)
