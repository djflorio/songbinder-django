import * as actions from './BinderActions';
import reducer, { defaultState } from './BinderReducer';

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('Binder', () => {

  it('should create action to start fetch', () => {
    expect(actions.startFetchBinder()).toEqual({
      type: actions.START_FETCH_BINDER
    });
  });

  it('should set fetching to true with startFetchBinder', () => {
    expect(reducer(undefined, actions.startFetchBinder("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to succeed binder fetch', () => {
    expect(actions.succeedFetchBinder("binder")).toEqual({
      type: actions.SUCCEED_FETCH_BINDER,
      binder: "binder"
    });
  });

  it('should add binder to store with succeedFetchBinder', () => {
    expect(reducer(fetchingState, actions.succeedFetchBinder("binder"))).toEqual({
      ...defaultState,
      binder: "binder",
      fetching: false
    });
  });

  it('should create action to fail binder fetch', () => {
    expect(actions.failFetchBinder()).toEqual({
      type: actions.FAIL_FETCH_BINDER
    });
  });

  it('should set fetching to false with failFetchBinder', () => {
    expect(reducer(fetchingState, actions.failFetchBinder())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel binder fetch', () => {
    expect(actions.cancelFetchBinder()).toEqual({
      type: actions.CANCEL_FETCH_BINDER
    });
  });

  it('should set fetching to false with cancelFetchBinder', () => {
    expect(reducer(fetchingState, actions.cancelFetchBinder())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should return default state with unrecognized action', () => {
    expect(reducer(undefined, { type: 'unrecognized' })).toEqual(
      defaultState
    );
  });

});