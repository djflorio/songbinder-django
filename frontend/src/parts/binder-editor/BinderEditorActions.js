import axios from 'axios';
import { getBinder } from '../binder/BinderActions';
import { getSongs } from '../song-list/SongListActions';

export const addSongToBinder = (sId, cId, uId) => {
  
  const data = {
    song: sId,
    binder: cId
  };

  return dispatch => {
    axios.post('/api/binders/action/', data)
    .then(res => {
      dispatch(getBinder(cId));
      dispatch(getSongs(uId));
    })
    .catch(err => {
      console.log(err);
    });
  }
  
}

export const remSongFromBinder = (sId, cId, uId) => {
  
  const data = {
    song: sId,
    binder: cId
  };

  return dispatch => {
    axios.delete('/api/binders/action/', { data: data })
    .then(res => {
      dispatch(getBinder(cId));
      dispatch(getSongs(uId));
    })
    .catch(err => {
      console.log(err);
    });
  }

}