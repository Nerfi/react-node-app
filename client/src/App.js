import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingComponent from './components/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';



function App() {

  return(
    <>
    <div className="App">
    <Router>

      <Switch>
       <Route exact  path="/login" component={Login} />
       <Route exact  path="/register" component={SignUp} />
       <Route exact  path="/" component={LandingComponent} />



      </Switch>

    </Router>

    </div>

    </>

  )

}


export default App;
