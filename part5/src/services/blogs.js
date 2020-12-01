import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogInfo) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.put(`${baseUrl}/${blogInfo.id}`, blogInfo, config)
  return response.data
}

export default { getAll, setToken, create, update }
