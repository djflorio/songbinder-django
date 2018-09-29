import * as actions from './BinderActions';

export const defaultState = {
  fetching: false,
  fetchCanceler: null,
  binder: {}
}

const binder = (state=defaultState, action) => {
  switch(action.type) {
    case actions.START_FETCH_BINDER: {
      return {
        ...state,
        fetching: true,
        fetchCanceler: action.fetchCanceler
      }
    }
    case actions.SUCCEED_FETCH_BINDER: {
      return {
        ...state,
        fetching: false,
        binder: action.binder
      }
    }
    case actions.FAIL_FETCH_BINDER:
    case actions.CANCEL_FETCH_BINDER: {
      return {
        ...state,
        fetching: false
      }
    }
    default: return state;
  }
}

export default binder;