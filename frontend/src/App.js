// Third party
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'

// Assets
import './App.css';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Components
import requireAuth from './parts/auth/requireAuth';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Dashboard from './pages/dashboard/DashboardPage';
import Song from './pages/SongPage';
import Edit from './pages/EditPage';
import Binder from './pages/BinderPage';
import BinderEdit from './pages/BinderEditPage';
import FlashMessageList from './parts/flash-message/FlashMessageList';

library.add(fas)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <FlashMessageList />
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route exact path="/songs/:sId" component={requireAuth(Song)} />
          <Route exact path="/songs/edit/:sId" component={requireAuth(Edit)} />
          <Route exact path="/binders/edit/:cId" component={requireAuth(BinderEdit)} />
          <Route exact path="/binders/:cId" component={requireAuth(Binder)} />
        </div>
      </Router>
    );
  }
}

export default App;
