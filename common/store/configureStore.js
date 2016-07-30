import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(preloadState) {
	const store = createStore(
		rootReducer,
		preloadState,
		applyMiddleware(thunk)
	);

	if(module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		})
	}
	return store;
}
