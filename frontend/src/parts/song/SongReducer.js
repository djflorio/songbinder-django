import * as actions from './SongActions';
import { SONG_CREATED } from '../song-list/SongListActions';

export const defaultState = {
  song: {
    id: 0,
    title: "",
    artist: "",
    formatVersion: 0,
    content: "",
    parsedContent: [],
    scope: "",
    user_id: 0
  },
  fetching: false
}

const song = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_FETCH_SONG: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.CANCEL_FETCH_SONG:
    case actions.FAIL_FETCH_SONG: {
      return {
        ...state,
        fetching: false
      }
    }
    case actions.SET_SONG: {
      return {
        ...state,
        song: action.song,
        fetching: false
      }
    }
    case SONG_CREATED: {
      return {
        ...state,
        song: {
          ...defaultState.song,
          id: action.sId
        }
      }
    }
    default: { return state; }
  }
}

export default song;