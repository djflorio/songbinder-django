import * as actions from './CollectionActions';

export const defaultState = {
  fetching: false,
  fetchCanceler: null,
  collection: {}
}

const collection = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_FETCH_COLLECTION: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.SUCCEED_FETCH_COLLECTION: {
      return {
        ...state,
        fetching: false,
        collection: action.collection
      }
    }
    case actions.FAIL_FETCH_COLLECTION:
    case actions.CANCEL_FETCH_COLLECTION: {
      return {
        ...state,
        fetching: false
      }
    }
    default: return state;
  }
}

export default collection;