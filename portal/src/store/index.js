import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // provides the dispatch function
import reducer from './../reducers'; // loads index.js by default

export default function configureStore(preloadedState)
{
    const initialState = {};

    const middleWare = [thunk];

    const store = createStore(reducer, preloadedState, applyMiddleware(...middleWare));
    
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        //module.hot.accept('./../reducers', () => store.replaceReducer(reducer))
    }

  return store;
}