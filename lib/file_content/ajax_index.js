/**
 * @file file content of ajax/index.js
 * @author Henry Yang
 */

module.exports = 
`/**
 * @file ajax init file
 */

import axios from 'axios'
import interceptors from './interceptors'

const api = axios.create({
  withCredentials: true,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.all = axios.all
api.spread = axios.spread

interceptors(api, 'request')
interceptors(api, 'response')

export default api
`
