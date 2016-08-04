import path from 'path';
import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import routes from './route';
import configureStore from '../common/store/configureStore';
import { fetchCounter } from '../common/api/counter';

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

// Add Dummy API Path
app.get('/api/counts', function (req, res, next) {
  var num = Math.floor( Math.random() * (100 - 0 )) + 0;
  res.json([
    {id: 1, value: num},
    {id: 2, value: num + 1},
    {id: 3, value: num + num}
  ]);
});

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
			fetchCounter( apiResult => {
				// Read the counter from the request, if provided
				const params = qs.parse(req.query);
				const counter = parseInt(params.counter,10) || apiResult || 0;
				//const postList = apiResult.posts;
				const siteRoot = apiResult.siteRoot;
				// Compile an initial state
				const preloadedState = { counter, siteRoot };

				// Create a new redux store instance
				const store = configureStore(preloadedState);

				// Render the component to a string
				const html = renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>
				);

				// Grab the initial state from out Refux store
				const finalState = store.getState();

				// Send the rendered page back to the client
				res.send( renderFullPage( html, finalState ));
			});
		} else {
			res.status(404).send('not found');
		}
	});
};

function renderFullPage( html, preloadedState ) {
	return `
	<!docutype html>
	<html>
	<head>
		<title>Redux Universal Example</title>
	</head>
	<body>
		<div id="app">${html}</div>
		<script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')};
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
