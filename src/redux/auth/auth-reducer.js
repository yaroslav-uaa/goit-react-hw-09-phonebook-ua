import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authActions from './auth-actions';

const innitialUserState = { name: null, email: null };

const user = createReducer(innitialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => payload.user,
  [authActions.logInSuccess]: (_, { payload }) => payload.user,
  [authActions.logOutSuccess]: () => innitialUserState,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.logInSuccess]: (_, { payload }) => payload.token,
  [authActions.logOutSuccess]: () => null,
});

const error = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.logInError]: (_, { payload }) => payload,
  [authActions.logOutSuccess]: (_, { payload }) => payload,
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
});

const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true,
  [authActions.logInSuccess]: () => true,
  [authActions.getCurrentUserRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.registerError]: () => false,
  [authActions.logInError]: () => false,
  [authActions.logOutSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
});

export default combineReducers({
  user,
  isAuthenticated,
  token,
  error,
});
