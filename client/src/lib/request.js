import { transformObjectInUrl, transformApiErrors } from './helpers';

const options = ({ method, body, auth: { token, userid } }) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token || ''}` } : {}),
    ...(userid ? { userid } : {})
  },
  ...(body ? { body: JSON.stringify(body) } : {})
});

const PromiseAPI = promise =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await promise;
      if (response.status === 200) {
        resolve(response);
      } else {
        const { errors } = await response.json();
        reject(transformApiErrors(errors));
      }
    } catch (e) {
      reject(e);
    }
  });

export function GET({ url, params, auth = { token: '', userid: '' } }) {
  return PromiseAPI(
    fetch(
      `${url}${params ? transformObjectInUrl(params) : ''}`,
      options({ method: 'get', auth })
    )
  );
}

export function POST({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'POST';
  return PromiseAPI(fetch(url, options({ method, body, auth })));
}

export function PUT({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'PUT';
  return PromiseAPI(fetch(url, options({ method, body, auth })));
}

export function DELETE({ url, body, auth = { token: '', userid: '' } }) {
  const method = 'DELETE';
  return PromiseAPI(fetch(url, options({ method, body, auth })));
}
