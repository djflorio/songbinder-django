import axios from 'axios';

export const START_FETCH_BINDERS = 'START_FETCH_BINDERS';
export const SUCCEED_FETCH_BINDERS = 'SUCCEED_FETCH_BINDERS';
export const FAIL_FETCH_BINDERS = 'FAIL_FETCH_BINDERS';
export const CANCEL_FETCH_BINDERS = 'CANCEL_FETCH_BINDERS';
export const BINDER_CREATED = 'BINDER_CREATED';


export const startFetchBinders = (source) => ({
  type: START_FETCH_BINDERS,
  fetchCanceler: source
});

export const succeedFetchBinders = (binders) => ({
  type: SUCCEED_FETCH_BINDERS,
  binders
});

export const failFetchBinders = () => ({
  type: FAIL_FETCH_BINDERS
});

export const cancelFetchBinders = () => ({
  type: CANCEL_FETCH_BINDERS
});

export function getBinders(uId) {

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  return dispatch => {
    dispatch(startFetchBinders(source));
    return axios.get('/api/binders/user/' + uId + '/', { cancelToken: source.token })
      .then(response => {
        dispatch(succeedFetchBinders(response.data));
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          dispatch(cancelFetchBinders());
        } else {
          dispatch(failFetchBinders());
        }
      });
  }
}