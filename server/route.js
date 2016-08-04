import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RouterLayout from '../common/containers/RouterLayout';
import Sample from '../common/containers/Sample';

export default (
	<Route path='/' component={RouterLayout}>
		<IndexRoute component={Sample} />
		<Route path='sample' component={Sample} />
	</Route>
)
