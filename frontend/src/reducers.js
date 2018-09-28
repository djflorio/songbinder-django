// Third party
import { combineReducers } from 'redux';

// Reducers
import flashMessages from './parts/flash-message/FlashMessageReducer';
import auth from './parts/auth/AuthReducer';
import song from './parts/song/SongReducer';
import songList from './parts/song-list/SongListReducer';
import collection from './parts/collection/CollectionReducer';
import collectionList from './parts/collection-list/CollectionListReducer';

export default combineReducers({
  flashMessages,
  auth,
  song,
  songList,
  collection,
  collectionList
});