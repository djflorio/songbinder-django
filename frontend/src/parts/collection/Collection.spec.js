import * as actions from './CollectionActions';
import reducer, { defaultState } from './CollectionReducer';

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('Collection', () => {

  it('should create action to start fetch', () => {
    expect(actions.startFetchCollection()).toEqual({
      type: actions.START_FETCH_COLLECTION
    });
  });

  it('should set fetching to true with startFetchCollection', () => {
    expect(reducer(undefined, actions.startFetchCollection("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to succeed collection fetch', () => {
    expect(actions.succeedFetchCollection("collection")).toEqual({
      type: actions.SUCCEED_FETCH_COLLECTION,
      collection: "collection"
    });
  });

  it('should add collection to store with succeedFetchCollection', () => {
    expect(reducer(fetchingState, actions.succeedFetchCollection("collection"))).toEqual({
      ...defaultState,
      collection: "collection",
      fetching: false
    });
  });

  it('should create action to fail collection fetch', () => {
    expect(actions.failFetchCollection()).toEqual({
      type: actions.FAIL_FETCH_COLLECTION
    });
  });

  it('should set fetching to false with failFetchCollection', () => {
    expect(reducer(fetchingState, actions.failFetchCollection())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel collection fetch', () => {
    expect(actions.cancelFetchCollection()).toEqual({
      type: actions.CANCEL_FETCH_COLLECTION
    });
  });

  it('should set fetching to false with cancelFetchCollection', () => {
    expect(reducer(fetchingState, actions.cancelFetchCollection())).toEqual({
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