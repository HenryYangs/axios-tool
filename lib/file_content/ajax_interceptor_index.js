/**
 * @file file content of ajax/interceptor/index.js
 * @author Henry Yang
 */

module.exports = 
`/**
 * @file ajax interceptors
 */

import requestHandler from './request'
import responseHandler from './response'

let interceptors = {
  request: requestHandler,
  response: responseHandler
}

export default (ajax, type) => {
  interceptors[type].forEach(item => {
    if (!item.onFulfilled) return

    ajax.interceptors[type].use(item.onFulfilled,
      error => {
        if (item.onRejected) {
          item.onRejected(error)
        } else {
          return Promise.reject(error)
        }
      }
    )
  })
}
`
