export const TOKEN = 'token';
export const RANKING = 'ranking';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export default function getToken() {
  return localStorage.getItem(TOKEN);
}

export const saveItem = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};

export const getItem = (key) => JSON.parse(localStorage.getItem(key));
