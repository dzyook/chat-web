import fetch from 'dva/fetch';
import commonHeadersInject from '../utils/commonHeadersInject';

const defaultOptions = {
  method: 'post',
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export async function query({ url, body = {}, options = {} }) {
  // return request('http://localhost:3000');
  options = await commonHeadersInject(options);
  const _options = {...defaultOptions, ...options};
  _options.headers = Object.assign(
    {},
    defaultOptions.headers,
    _options.headers
  );
  _options.body = JSON.stringify({ commons: {}, datas: body });
  const response = await fetch(url, _options)

  checkStatus(response);

  const json = await response.json();
  return json;
}
