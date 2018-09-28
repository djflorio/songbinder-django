import * as actions from './SongActions';
import { songCreated } from '../song-list/SongListActions';
import reducer, { defaultState } from './SongReducer';


const testString1 = "one [C]two\n[..D]three four";

const testResult1 = [
  [
    { lyric: "one", chord: "" },
    { lyric: "two", chord: "C" }
  ],
  [
    { lyric: "three", chord: "  D" },
    { lyric: "four", chord: "" }
  ]
];

const demoSong = {
  id: 1,
  title: "test",
  artist: "artist",
  formatVersion: 1,
  content: testString1,
  scope: "public",
  user_id: 1
};

const parsedDemoSong = {
  ...demoSong,
  parsedContent: testResult1
};

const fetchingState = {
  ...defaultState,
  fetching: true
};

describe('Song', () => {

  it('should create action to start song fetch', () => {
    expect(actions.startFetchSong("source")).toEqual({
      type: actions.START_FETCH_SONG,
      fetchCanceler: "source"
    });
  });

  it('should set fetching to true with startFetchSong', () => {
    expect(reducer(undefined, actions.startFetchSong("source"))).toEqual({
      ...defaultState,
      fetching: true,
      fetchCanceler: "source"
    });
  });

  it('should create action to set song', () => {
    expect(actions.setSong(demoSong)).toEqual({
      type: actions.SET_SONG,
      song: parsedDemoSong
    });
  });

  it('should set song with setSong', () => {
    expect(reducer(fetchingState, actions.setSong(demoSong))).toEqual({
      ...defaultState,
      song: parsedDemoSong,
      fetching: false
    });
  });

  it('should create action to fail song fetch', () => {
    expect(actions.failFetchSong()).toEqual({
      type: actions.FAIL_FETCH_SONG
    });
  });

  it('should set fetching to false with failFetchSong', () => {
    expect(reducer(fetchingState, actions.failFetchSong())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to cancel song fetch', () => {
    expect(actions.cancelFetchSong()).toEqual({
      type: actions.CANCEL_FETCH_SONG
    });
  });

  it('should set fetching to false with cancelFetchSong', () => {
    expect(reducer(fetchingState, actions.cancelFetchSong())).toEqual({
      ...fetchingState,
      fetching: false
    });
  });

  it('should create action to get song', () => {
    expect(actions.setSong(demoSong)).toEqual({
      type: actions.SET_SONG,
      song: parsedDemoSong
    });
  });

  it('should create action for deleted song', () => {
    expect(actions.songDeleted(5)).toEqual({
      type: actions.SONG_DELETED,
      sId: 5
    });
  })

  it('should set blank song when song created', () => {
    expect(reducer(undefined, songCreated(5))).toEqual({
      ...defaultState,
      song: {
        ...defaultState.song,
        id: 5
      }
    })
  });

  it('should return default state with unrecognized action', () => {
    expect(reducer(undefined, {type: "unrecognized"})).toEqual(defaultState);
  });

  it('should parse song with parseSong', () => {
    expect(actions.parseSong(testString1)).toEqual(testResult1);
  });

});