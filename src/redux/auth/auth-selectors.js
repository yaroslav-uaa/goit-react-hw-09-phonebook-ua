const getIsLoggedIn = state => state.auth.isAuthenticated;

const getUsername = state => state.auth.user.name;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
};
export default authSelectors;
