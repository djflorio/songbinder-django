import axios from 'axios';
import { getCollection } from '../collection/CollectionActions';
import { getSongs } from '../song-list/SongListActions';

export const addSongToCollection = (sId, cId, uId) => {
  
  const data = {
    song: sId,
    collection: cId
  };

  return dispatch => {
    axios.post('/api/collections/action/', data)
    .then(res => {
      dispatch(getCollection(cId));
      dispatch(getSongs(uId));
    })
    .catch(err => {
      console.log(err);
    });
  }
  
}

export const remSongFromCollection = (sId, cId, uId) => {
  
  const data = {
    song: sId,
    collection: cId
  };

  return dispatch => {
    axios.delete('/api/collections/action/', { data: data })
    .then(res => {
      dispatch(getCollection(cId));
      dispatch(getSongs(uId));
    })
    .catch(err => {
      console.log(err);
    });
  }

}