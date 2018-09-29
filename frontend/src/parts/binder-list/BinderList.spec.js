import * as actions from './BinderListActions';
import reducer, { defaultState } from './BinderListReducer';

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('Binders', () => {

  it('should create action to start binders fetch', () => {
    expect(actions.startFetchBinders("source")).toEqual({
      type: actions.START_FETCH_BINDERS,
      fetchCanceler: "source"
    });
  });

  it('should set fetching to true with startFetchBinders', () => {
    expect(reducer(undefined, actions.startFetchBinders("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to succeed binders fetch', () => {
    expect(actions.succeedFetchBinders("binders")).toEqual({
      type: actions.SUCCEED_FETCH_BINDERS,
      binders: "binders"
    });
  });

  it('should add binders to store with succeedFetchBinders', () => {
    expect(reducer(fetchingState, actions.succeedFetchBinders("binders"))).toEqual({
      ...defaultState,
      binders: "binders",
      fetching: false
    });
  });

  it('should create action to fail binders fetch', () => {
    expect(actions.failFetchBinders()).toEqual({
      type: actions.FAIL_FETCH_BINDERS
    });
  });

  it('should set fetching to false with failFetchBinders', () => {
    expect(reducer(fetchingState, actions.failFetchBinders())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel binders fetch', () => {
    expect(actions.cancelFetchBinders()).toEqual({
      type: actions.CANCEL_FETCH_BINDERS
    });
  });

  it('should set fetching to false with cancelFetchBinders', () => {
    expect(reducer(fetchingState, actions.cancelFetchBinders())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  /*it('should remove binder with binderDeleted', () => {
    expect(reducer({ songs: songList }, songDeleted(2))).toEqual({
      songs: [{id: 1, title: "test"}]
    });
  });*/

  it('should return default state with unrecognized action', () => {
    expect(reducer(undefined, { type: 'unrecognized' })).toEqual(
      defaultState
    );
  });

});