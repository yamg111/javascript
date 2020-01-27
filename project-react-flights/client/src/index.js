import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers} from "redux"
import {Provider} from "react-redux"
import reducerUser from "./reducers/reducer_user"
import reducerVacations from "./reducers/reducer_vacations"
import allActions from "./allActions"
const allReducers=combineReducers({
    username:reducerUser,
    vacations:reducerVacations
})


const store=createStore(allReducers)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
