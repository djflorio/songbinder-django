import * as actions from './SongListActions';
import { songDeleted } from '../song/SongActions';
import reducer, { defaultState } from './SongListReducer';

const songList = [
  {
    id: 1,
    title: "test"
  },
  {
    id: 2,
    title: "test2"
  }
];

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('SongList', () => {

  it('should create action to start songs fetch', () => {
    expect(actions.startFetchSongs("source")).toEqual({
      type: actions.START_FETCH_SONGS,
      fetchCanceler: "source"
    });
  });

  it('should set fetching to true with startFetchSongs', () => {
    expect(reducer(undefined, actions.startFetchSongs("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to succeed songs fetch', () => {
    expect(actions.succeedFetchSongs(songList)).toEqual({
      type: actions.SUCCEED_FETCH_SONGS,
      songs: songList
    });
  });

  it('should add songs to store with succeedFetchSongs', () => {
    expect(reducer(fetchingState, actions.succeedFetchSongs(songList))).toEqual({
      ...defaultState,
      songs: songList,
      fetching: false
    });
  });

  it('should create action to fail songs fetch', () => {
    expect(actions.failFetchSongs()).toEqual({
      type: actions.FAIL_FETCH_SONGS
    });
  });

  it('should set fetching to false with failFetchSongs', () => {
    expect(reducer(fetchingState, actions.failFetchSongs())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel songs fetch', () => {
    expect(actions.cancelFetchSongs()).toEqual({
      type: actions.CANCEL_FETCH_SONGS
    });
  });

  it('should set fetching to false with cancelFetchSongs', () => {
    expect(reducer(fetchingState, actions.cancelFetchSongs())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should remove song with songDeleted', () => {
    expect(reducer({ songs: songList }, songDeleted(2))).toEqual({
      songs: [{id: 1, title: "test"}]
    });
  });

  it('should return default state with unrecognized action', () => {
    expect(reducer(undefined, { type: 'unrecognized' })).toEqual(
      defaultState
    );
  });

});