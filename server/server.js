import path from 'path';
import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import routes from './route';
import configureStore from '../common/store/configureStore';
import { fetchApi } from '../common/api/counter';

const app = new Express();
const port = 3000;

// Use this middleware to set up hot module reloading via webpack
const compiler = webpack( webpackConfig );
app.use(webpackDevMiddleware( compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	})
);
app.use(webpackHotMiddleware(compiler));

// This is fired every time the server side receives a request
app.use(handleRender);

function handleRender( req, res ) {
	match({ routes, location:req.url}, (error,redirectLocation, renderProps) => {
		if(error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps){
			// Query out mock API asynchronously
			fetchApi( renderProps.params, apiResult => {
				if ( apiResult.posts instanceof Error ) {
					res.status(404);
				} else {
					res.status(200);
				}
				// Read the counter from the request, if provided
				const params = qs.parse(req.query);
				const counter = parseInt(params.counter,10) || apiResult || 0;
				const postList = apiResult.posts;
				const siteRoot = apiResult.siteRoot;
				// Compile an initial state
				const preloadedState = { siteRoot, postList };

				// Create a new redux store instance
				const store = configureStore(preloadedState);

				// Render the component to a string
				const html = renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>
				);
				let head = Helmet.rewind();

				// Grab the initial state from out Refux store
				const finalState = store.getState();

				// Send the rendered page back to the client
				res.send( renderFullPage( html, finalState, head ) );
			});
		} else {
			res.status(404).send('not found');
		}
	});
};

function renderFullPage( html, preloadedState, head ) {
	return `
	<!docutype html>
	<html ${head.htmlAttributes}>
	<head>
		${head.title}
		${head.meta}
		${head.link}
		${head.style}
		${head.script}
	</head>
	<body>
		<div id="app">${html}</div>
		<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')};
			console.log(window.__PRELOADED_STATE__);
		</script>
		<script src="/static/bundle.js"></script>
	</body>
	</html>
	`
}

app.listen(port, (error) => {
	if ( error ) {
		console.error(error);
	} else {
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
	}
})
