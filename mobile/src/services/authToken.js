// Pequeno "store" em memória para o token.
// Evita acoplamento do Axios com React Context e ciclos de import.
let _token = null;

export function setAuthToken(token) {
  _token = token ?? null;
}

export function getAuthToken() {
  return _token;
}

