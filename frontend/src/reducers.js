// Third party
import { combineReducers } from 'redux';

// Reducers
import flashMessages from './parts/flash-message/FlashMessageReducer';
import auth from './parts/auth/AuthReducer';
import song from './parts/song/SongReducer';
import songList from './parts/song-list/SongListReducer';
import binder from './parts/binder/BinderReducer';
import binderList from './parts/binder-list/BinderListReducer';

export default combineReducers({
  flashMessages,
  auth,
  song,
  songList,
  binder,
  binderList
});