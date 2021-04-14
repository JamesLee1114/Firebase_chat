import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './firebase/firebase';

import './App.css';
import SendVerificationEmail from './pages/SendVerificationEmail';
import EmailConfirm from './pages/EmailConfirm';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setEmailVerified(user.emailVerified)
        setAuthenticated(true)
        setLoading(false)
      } else {
        setAuthenticated(false)
        setEmailVerified(false)
        setLoading(false)
      }
    })
  }, [])

  const logOut = () => {
    auth().signOut().then(() => {
      setAuthenticated(false)
      setEmailVerified(false)
      setLoading(false)
      // logged out
    }).catch((error) => {
      // An error happened.
    });
  }

  const emailVerifiy = (emailCheck) => {
    setEmailVerified(emailCheck)
  }


  return loading === true ? <h2>Loading...</h2> : (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute path="/chat" logOut={logOut} authenticated={authenticated} emailVerified={emailVerified} component={Chat}></PrivateRoute>
        <Route exact path="/sendVerificationEmail" authenticated={authenticated} emailVerified={emailVerified} component={SendVerificationEmail}></Route>
        <Route exact path="/emailConfirm" authenticated={authenticated} emailVerified={emailVerified} render={(props) => <EmailConfirm {...props} emailVerifiy={emailVerifiy} />}></Route>
        <PublicRoute path="/signup" authenticated={authenticated} emailVerified={emailVerified} component={Signup}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} emailVerified={emailVerified} component={Login}></PublicRoute>
      </Switch>
    </Router>
  );
}



function PrivateRoute({ component: Component, authenticated, emailVerified, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true && emailVerified === true
          ? <Component {...props} logOut={rest.logOut} />
          : authenticated === true && emailVerified === false
            ? <Redirect to={{ pathname: '/sendVerificationEmail', state: { from: props.location } }} />
            : <Redirect to='/login' />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, emailVerified, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : emailVerified === false ? <Redirect to='/sendVerificationEmail' /> : <Redirect to='/chat' />}
    />
  )
}
export default App;
