export const checkAuth = () => {
  if (localStorage.getItem('user')) return true;
  return false;
};
