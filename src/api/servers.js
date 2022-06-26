const axios = require('axios');

const SERVER_URL_BASE = 'https://143ab0cb-cb0f-4435-8d17-4d38d4c231e8.mock.pstmn.io/';
const route = '/servers/';

const client = axios.create({ baseURL: SERVER_URL_BASE });

async function get(id = '') {
  const res = await client.get(`${route}${id}`);
  return res.data;
}

async function save(data) {
  const res = await client.post(route, data);
  return res.data;
}

async function edit(id, data) {
  const res = await client.put(`${route}${id}`, data);
  return res.data;
}

async function remove(id) {
  const res = await client.delete(`${route}${id}`);
  return res.data;
}

module.exports = { get, save, edit, remove };
