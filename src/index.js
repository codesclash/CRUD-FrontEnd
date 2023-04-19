import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import {  createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './redux/reducers/postReducer';


const middleware = [thunk];

const store = createStore(postReducer,composeWithDevTools(applyMiddleware(...middleware)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
    <BrowserRouter>
    <App  />
    </BrowserRouter>
    </Provider>
);
