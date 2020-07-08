import React, { useContext } from 'react';

import { Router, Redirect } from '@reach/router'

import './App.css';

import LoginPage from './pages/login';
import Feed from './components/tweets/feed';
import { Context } from './Context';

import Header from './pages/header/header';
import Profile from './components/profile/profile';
import Signup from './components/login/signup';
import { setUpAxios } from './utils/user_auth';
import TweetDetail from './components/tweets/tweet-detail';
import SettingProfile from './components/profile/settings';

function App() {
  
  const { isAuth } = useContext(Context)
  if(isAuth){
    setUpAxios(sessionStorage.getItem('token'))
  }
  
  return (
    <div className="container">
        <Header />
        <div className="col-md-10 col-sm-12 mx-auto mt-3">
          <Router>
            <Feed path='/' />
            <Profile path="/profile/:username"></Profile>
            <TweetDetail path="/tweets/:id"/>
            { !isAuth && <LoginPage path='/login' />}
            { isAuth && <Redirect from='/login' to='/' noThrow />}
            { !isAuth && <Signup path="/signup"></Signup>}
            { isAuth && <SettingProfile path="/profile/:username/settings"></SettingProfile>}
          </Router>
        </div>
    </div>
  );
}

export default App;
