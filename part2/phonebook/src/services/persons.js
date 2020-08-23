import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = (newEntry) => {
  const response = axios.post(baseUrl, newEntry)
  return response.then(response => response.data)
}

const update = (id, newEntry) => {
  const response = axios.put(`${baseUrl}/${id}`, newEntry)
  return response.then(response => response.data)
}

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response
}


export default {getAll, create, update, remove}