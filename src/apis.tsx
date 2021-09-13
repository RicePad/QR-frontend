/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';

interface Props {
  data: {}
  token: string
  method: string
}

function request(path: string, { data = null, token = null, method = 'GET`' }: Props) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  })
    .then((response) => {
      console.log(response);

      // If it is success
      if (response.ok) {
        if (method === 'DELETE') {
          return true;
        }
        return response.json();
      }
      // Otherwise, if there are errors
      return response
        .json()
        .then((json) => {
        // Handle JSON error, response by the server
          if (response.status === 400) {
            const errors = Object.keys(json).map(
              (k) => `${(json[k].join(' '))}`,
            );
            throw new Error(errors.join(' '));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          if (e.name === 'SyntaxError') {
            throw new Error(response.statusText);
          }
          throw new Error(e);
        });
    })
    .catch((e) => {
      // Handle all errors
      toast(e.message, { type: 'error' });
    });
}

export function signIn(username: string, password: string) {
  return request('/auth/token/login/', {
    data: { username, password },
    method: 'POST',
    token: null,
  });
}

export function register(username: string, password: string) {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST',
    token: null,
  });
}
