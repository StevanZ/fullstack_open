import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllNames = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createName = (nameObj) => {
  const request = axios.post(baseUrl, nameObj);
  return request.then((res) => res.data);
};

const deleteName = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

const updateNumber = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact);
  return request.then((res) => res.data);
};

export default { getAllNames, createName, deleteName, updateNumber };
