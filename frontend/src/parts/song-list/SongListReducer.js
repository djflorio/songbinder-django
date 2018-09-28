import * as actions from './SongListActions';
import { SONG_DELETED } from '../song/SongActions';

export const defaultState = {
  songs: [],
  fetching: false,
  fetchCanceler: null
}

const songList = (state=defaultState, action) => {
  switch (action.type) {
    case actions.START_FETCH_SONGS: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.SUCCEED_FETCH_SONGS: {
      return {
        ...state,
        songs: action.songs,
        fetching: false
      }
    }
    case actions.FAIL_FETCH_SONGS:
    case actions.CANCEL_FETCH_SONGS: {
      return {
        ...state,
        fetching: false
      }
    }
    case SONG_DELETED: {
      const newSongs = [];

      for (let i=0; i<state.songs.length; i++) {
        if (state.songs[i].id !== action.sId) {
          newSongs.push(state.songs[i]);
        }
      }
      return {
        ...state,
        songs: newSongs
      }
    }
    default: return state;
  }
}

export default songList;