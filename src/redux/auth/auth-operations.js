import axios from 'axios';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = user => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/users/signup', user);

    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
  } catch (error) {
    dispatch(authActions.registerError('DUde, I think you`re lost...'));
  }
};

const logIn = user => async dispatch => {
  dispatch(authActions.logInRequest());

  try {
    const response = await axios.post('/users/login', user);

    token.set(response.data.token);
    dispatch(authActions.logInSuccess(response.data));
  } catch (error) {
    dispatch(authActions.logInError('Looks like a mayday situation!'));
  }
};

const logOut = () => async dispatch => {
  dispatch(authActions.logOutRequest());

  try {
    await axios.post('/users/logout');

    token.unset();
    dispatch(authActions.logOutSuccess());
  } catch (error) {
    dispatch(authActions.logOutError('Task failed successfully'));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(authActions.getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(
      authActions.getCurrentUserError('Booh! Sever is in spirit world.'),
    );
  }
};

const authOperations = { register, logOut, logIn, getCurrentUser };

export default authOperations;
