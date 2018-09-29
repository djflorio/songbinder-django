import * as actions from './BinderListActions';

export const defaultState = {
  binders: [],
  fetching: false,
  fetchCanceler: null
}

const binderList = (state=defaultState, action) => {
  switch (action.type) {
    case actions.START_FETCH_BINDERS: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.SUCCEED_FETCH_BINDERS: {
      return {
        ...state,
        binders: action.binders,
        fetching: false
      }
    }
    case actions.FAIL_FETCH_BINDERS:
    case actions.CANCEL_FETCH_BINDERS: {
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

export default binderList;