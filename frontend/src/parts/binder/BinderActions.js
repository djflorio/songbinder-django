import axios from 'axios';

export const START_FETCH_BINDER = 'START_FETCH_BINDER';
export const SUCCEED_FETCH_BINDER = 'SUCCEED_FETCH_BINDER';
export const FAIL_FETCH_BINDER = 'FAIL_FETCH_BINDER';
export const CANCEL_FETCH_BINDER = 'CANCEL_FETCH_BINDER';


export const startFetchBinder = (source) => ({
  type: START_FETCH_BINDER,
  fetchCanceler: source
});

export const succeedFetchBinder = (binder) => ({
  type: SUCCEED_FETCH_BINDER,
  binder
});

export const failFetchBinder = () => ({
  type: FAIL_FETCH_BINDER
});

export const cancelFetchBinder = () => ({
  type: CANCEL_FETCH_BINDER
});

export const createBinder = () => {
  console.log("CREATE");
}

export function getBinder(cId) {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchBinder(source));
    return axios.get('/api/binders/' + cId + '/', { cancelToken: source.token })
      .then(response => {
        dispatch(succeedFetchBinder(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchBinder());
        } else {
          dispatch(failFetchBinder());
        }
      });
  }
}