const axios = require('axios')
const qs = require('qs')

// Main calls to kognitive api

module.exports.authenticateUser = (data) => {
  const endpoint = process.env.KOGNITIVE_API_URL + "/login/password"
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'apptoken': process.env.KOGNITIVE_APP_TOKEN
    }
  }
  return axios.post(endpoint, qs.stringify(data), config).then(response => {
    return response.data
  }).catch(error => error)
}

const getTaskPath = (parentId) => {
  if (parentId) {
    return `/task/list?parent_id=${parentId}`
  }
  return '/task/list'
}

module.exports.getTaskList = (data) => {
  const endpoint = process.env.KOGNITIVE_API_URL + `${getTaskPath(data.parentId)}` 
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'apptoken': process.env.KOGNITIVE_APP_TOKEN,
      'usertoken': data.usertoken,
    }
  }

  return axios.post(endpoint,{}, config).then(response => response.data).catch(error => error)
}