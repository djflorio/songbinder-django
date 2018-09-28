import * as actions from './CollectionListActions';

export const defaultState = {
  collections: [],
  fetching: false,
  fetchCanceler: null
}

const collectionList = (state=defaultState, action) => {
  switch (action.type) {
    case actions.START_FETCH_COLLECTIONS: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.SUCCEED_FETCH_COLLECTIONS: {
      return {
        ...state,
        collections: action.collections,
        fetching: false
      }
    }
    case actions.FAIL_FETCH_COLLECTIONS:
    case actions.CANCEL_FETCH_COLLECTIONS: {
      return {
        ...state,
        fetching: false
      }
    }
    /*case SONG_DELETED: {
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
    }*/
    default: return state;
  }
}

export default collectionList;