import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = (personObject) => {
    const req = axios.post(baseUrl, personObject)
    return req.then(response => response.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(response => response.data)
}
const deleteObject = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req
}

export default { getAll, create, update, deleteObject }