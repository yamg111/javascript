import React from 'react';
import './App.css';
import {useSelector,useDispatch} from "react-redux"
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import VacationsUser from './components/VacationsUser';
import VacationsAdmin from './components/VacationsAdmin';
function App() {
  const user = useSelector(state=>state.user)
 
  return (
      <Router>
    <div className="App">

     <Switch>
       <Route path="/login" component={Login}/>
       <Route path='/vacationsuser' component={VacationsUser}/>
       <Route path='/vacationadmin' component={VacationsAdmin}/>
       <Route path="/" component={Login}/>
     </Switch>
      
    </div>
    </Router>
  );
}

export default App;
