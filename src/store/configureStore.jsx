import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware, thunk))
    )
export default store;