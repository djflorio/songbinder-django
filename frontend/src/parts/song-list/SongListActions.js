import axios from 'axios';

export const START_FETCH_SONGS = 'START_FETCH_SONGS';
export const SUCCEED_FETCH_SONGS = 'SUCCEED_FETCH_SONGS';
export const FAIL_FETCH_SONGS = 'FAIL_FETCH_SONGS';
export const CANCEL_FETCH_SONGS = 'CANCEL_FETCH_SONGS';
export const SONG_CREATED = 'SONG_CREATED';

export const startFetchSongs = (source) => ({
  type: START_FETCH_SONGS,
  fetchCanceler: source
});

export const succeedFetchSongs = (songs) => ({
  type: SUCCEED_FETCH_SONGS,
  songs
});

export const failFetchSongs = () => ({
  type: FAIL_FETCH_SONGS
});

export const cancelFetchSongs = () => ({
  type: CANCEL_FETCH_SONGS
});

export function getSongs(uId) {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchSongs(source));
    return axios.get('/api/songs/user/' + uId + '/', { cancelToken: source.token })
      .then(response => {
        dispatch(succeedFetchSongs(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchSongs());
        } else {
          dispatch(failFetchSongs());
        }
      });
  }
}

export const songCreated = (sId) => ({
  type: SONG_CREATED,
  sId
});

export function createSong(history) {
  const data = {
    title: "",
    artist: "",
    content: ""
  }
  return dispatch => {
    return axios.post('/api/songs/', data)
      .then((response) => {
        dispatch(songCreated(response.data.id));
        history.push('/songs/edit/' + response.data.id);
      }).catch(function (error) {
        console.log(error);
      });
  }
}