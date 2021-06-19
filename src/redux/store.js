import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import initialState from './initialState';

const reducers = {
  form: formReducer,
};

Object.keys(initialState).forEach((item) => {
  if (item) {
    if (typeof reducers[item] === `undefined`) {
      reducers[item] = (statePart = null) => statePart;
    }
  }
});

const combinedReducers = combineReducers(reducers);

const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
