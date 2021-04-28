const getIsLoggedIn = state => state.auth.isAuthenticated;

const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;
const getErrorValue = state => state.auth.error;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getUserEmail,
  getErrorValue,
};
export default authSelectors;
