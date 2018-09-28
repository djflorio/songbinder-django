import axios from 'axios';

export const SET_SONG = 'SET_SONG';
export const PARSE_SONG = 'PARSE_SONG';
export const SONG_DELETED = 'SONG_DELETED';
export const START_FETCH_SONG = 'START_FETCH_SONG';
export const SUCCEED_FETCH_SONG = 'SUCCEED_FETCH_SONG';
export const FAIL_FETCH_SONG = 'FAIL_FETCH_SONG';
export const CANCEL_FETCH_SONG = 'CANCEL_FETCH_SONG';

export const startFetchSong = (source) => ({
  type: START_FETCH_SONG,
  fetchCanceler: source
});

export const failFetchSong = () => ({
  type: FAIL_FETCH_SONG
});

export const cancelFetchSong = () => ({
  type: CANCEL_FETCH_SONG
});

export const setSong = (song) => {
  song.parsedContent = parseSong(song.content);
  return {
    type: SET_SONG,
    song: song
  }
};

export const getSong = (sId, history) => {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchSong(source));
    return axios.get('/api/songs/' + sId)
      .then(response => {
        dispatch(setSong(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchSong());
        } else {
          dispatch(failFetchSong());
          if (error.response.status === 403) {
            // TODO: Add flash message
            history.push("/binder/songs");
          } else if (error.response.status === 404) {
            // TODO Add flash message
            history.push("/binder/songs");
          }
        }
      });
  }
}

export const delSong = (sId) => {
  return dispatch => {
    return axios.delete('/api/songs/' + sId)
      .then((response) => {
        console.log("deleted");
        dispatch(songDeleted(sId));
      }).catch(function (error) {
        console.log(error);
      });
  }
}

export const songDeleted = (sId) => ({
  type: SONG_DELETED,
  sId
});

export const parseSong = (content) => {
  const lines = content.split("\n");
  for (let i=0; i < lines.length; i++) {
    lines[i] = lines[i].split(" ");
    for (let j=0; j < lines[i].length; j++) {
      let chunk = {};
      let re = /\[(.*?)\]/;
      let chord = lines[i][j].match(re);
      if (chord) {
        chord = chord[1].replace(/\./g, " ");
      }
      let lyric = lines[i][j].replace(re, "");
      chunk.chord = chord ? chord : "";
      chunk.lyric = lyric;
      lines[i][j] = chunk;
    }
  }
  return lines;
}