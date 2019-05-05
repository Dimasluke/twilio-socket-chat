import { createStore, combineReducers } from 'redux'

import UserReducer from './Reducers/UserReducer';
import MessageReducer from './Reducers/MessageReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    messages: MessageReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;