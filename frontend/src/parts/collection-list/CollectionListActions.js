import axios from 'axios';

export const START_FETCH_COLLECTIONS = 'START_FETCH_COLLECTIONS';
export const SUCCEED_FETCH_COLLECTIONS = 'SUCCEED_FETCH_COLLECTIONS';
export const FAIL_FETCH_COLLECTIONS = 'FAIL_FETCH_COLLECTIONS';
export const CANCEL_FETCH_COLLECTIONS = 'CANCEL_FETCH_COLLECTIONS';
export const COLLECTION_CREATED = 'COLLECTION_CREATED';


export const startFetchCollections = (source) => ({
  type: START_FETCH_COLLECTIONS,
  fetchCanceler: source
});

export const succeedFetchCollections = (collections) => ({
  type: SUCCEED_FETCH_COLLECTIONS,
  collections
});

export const failFetchCollections = () => ({
  type: FAIL_FETCH_COLLECTIONS
});

export const cancelFetchCollections = () => ({
  type: CANCEL_FETCH_COLLECTIONS
});

export function getCollections(uId) {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchCollections(source));
    return axios.get('/api/collections/user/' + uId + '/', { cancelToken: source.token })
      .then(response => {
        dispatch(succeedFetchCollections(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchCollections());
        } else {
          dispatch(failFetchCollections());
        }
      });
  }
}