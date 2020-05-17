import jsCookie from 'js-cookie';

const logout = () => {
  removeToken();
};

const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getCookieToken();
  return !!token;
};

const setToken = (idToken) => {
  jsCookie.set('TDCX_SESSION_ID', idToken);
};
const removeToken = () => {
  jsCookie.remove('TDCX_SESSION_ID');
};

const getCookieToken = () => {
  return jsCookie.get('TDCX_SESSION_ID');
};

export { loggedIn, setToken, removeToken, getCookieToken, logout };
