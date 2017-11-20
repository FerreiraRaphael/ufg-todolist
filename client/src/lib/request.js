// import { transformObjectInUrl } from './helpers';

const options = ({ method, body, auth: { token, userid } }) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token || ''}` } : {}),
    userid
  },
  ...(body ? { body: JSON.stringify(body) } : {})
});

const API_URL = process.env.REACT_APP_API_URL;

// export function GET({ url, params, auth = { token: '', userid: '' } }) {
//   return fetch(
//     `${API_URL}/${url}${params ? transformObjectInUrl(params) : ''}`,
//     options({ method: 'get', auth })
//   ).then(x => x.json());
// }

export function POST({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'POST';
  return fetch(`${API_URL}/${url}`, options({ method, body, auth })).then(x =>
    x.json()
  );
}

export function PUT({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'PUT';
  return fetch(`${API_URL}/${url}`, options({ method, body, auth })).then(x =>
    x.json()
  );
}

export function DELETE({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'DELETE';
  return fetch(`${API_URL}/${url}`, options({ method, body, auth })).then(x =>
    x.json()
  );
}
