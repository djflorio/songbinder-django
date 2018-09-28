// Third party
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Assets
import './App.css';

// Components
import requireAuth from './parts/auth/requireAuth';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Binder from './pages/BinderPage';
import Song from './pages/SongPage';
import Edit from './pages/EditPage';
import Collection from './pages/CollectionPage';
import CollectionEdit from './pages/CollectionEditPage';
import FlashMessageList from './parts/flash-message/FlashMessageList';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <FlashMessageList />
          <Route exact path="/" component={Home} />
          <Route path='/login' component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/binder" component={requireAuth(Binder)} />
          <Route exact path="/songs/:sId" component={requireAuth(Song)} />
          <Route exact path="/songs/edit/:sId" component={requireAuth(Edit)} />
          <Route exact path="/collections/edit/:cId" component={requireAuth(CollectionEdit)} />
          <Route exact path="/collections/:cId" component={requireAuth(Collection)} />
        </div>
      </Router>
    );
  }
}

export default App;
