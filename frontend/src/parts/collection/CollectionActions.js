import axios from 'axios';

export const START_FETCH_COLLECTION = 'START_FETCH_COLLECTION';
export const SUCCEED_FETCH_COLLECTION = 'SUCCEED_FETCH_COLLECTION';
export const FAIL_FETCH_COLLECTION = 'FAIL_FETCH_COLLECTION';
export const CANCEL_FETCH_COLLECTION = 'CANCEL_FETCH_COLLECTION';


export const startFetchCollection = (source) => ({
  type: START_FETCH_COLLECTION,
  fetchCanceler: source
});

export const succeedFetchCollection = (collection) => ({
  type: SUCCEED_FETCH_COLLECTION,
  collection
});

export const failFetchCollection = () => ({
  type: FAIL_FETCH_COLLECTION
});

export const cancelFetchCollection = () => ({
  type: CANCEL_FETCH_COLLECTION
});

export const createCollection = () => {
  console.log("CREATE");
}

export function getCollection(cId) {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchCollection(source));
    return axios.get('/api/collections/' + cId + '/', { cancelToken: source.token })
      .then(response => {
        dispatch(succeedFetchCollection(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchCollection());
        } else {
          dispatch(failFetchCollection());
        }
      });
  }
}