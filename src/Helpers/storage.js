const TOKEN = 'token';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export default function getToken() {
  return localStorage.getItem(TOKEN);
}
