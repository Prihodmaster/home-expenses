import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

export default function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware, thunk)
    )(createStore)(rootReducer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store
}

