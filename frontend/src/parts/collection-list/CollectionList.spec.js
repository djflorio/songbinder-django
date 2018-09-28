import * as actions from './CollectionListActions';
import reducer, { defaultState } from './CollectionListReducer';

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('Collections', () => {

  it('should create action to start collections fetch', () => {
    expect(actions.startFetchCollections("source")).toEqual({
      type: actions.START_FETCH_COLLECTIONS,
      fetchCanceler: "source"
    });
  });

  it('should set fetching to true with startFetchCollections', () => {
    expect(reducer(undefined, actions.startFetchCollections("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to succeed collections fetch', () => {
    expect(actions.succeedFetchCollections("collections")).toEqual({
      type: actions.SUCCEED_FETCH_COLLECTIONS,
      collections: "collections"
    });
  });

  it('should add collections to store with succeedFetchCollections', () => {
    expect(reducer(fetchingState, actions.succeedFetchCollections("collections"))).toEqual({
      ...defaultState,
      collections: "collections",
      fetching: false
    });
  });

  it('should create action to fail collections fetch', () => {
    expect(actions.failFetchCollections()).toEqual({
      type: actions.FAIL_FETCH_COLLECTIONS
    });
  });

  it('should set fetching to false with failFetchCollections', () => {
    expect(reducer(fetchingState, actions.failFetchCollections())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel collections fetch', () => {
    expect(actions.cancelFetchCollections()).toEqual({
      type: actions.CANCEL_FETCH_COLLECTIONS
    });
  });

  it('should set fetching to false with cancelFetchCollections', () => {
    expect(reducer(fetchingState, actions.cancelFetchCollections())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  /*it('should remove collection with collectionDeleted', () => {
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