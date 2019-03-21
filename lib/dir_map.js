/**
 * @file Map for create directory
 * @author Henry Yang
 */

const PATH_PREFIX = './file_content'
const INTERCEPTOR_TPL = require(`${PATH_PREFIX}/ajax_interceptor_tpl`)

module.exports = [
  {
    name: 'ajax',
    children: [
      {
        name: 'interceptors',
        children: [
          {
            name: 'request',
            children: [
              {
                name: 'index.js',
                content: INTERCEPTOR_TPL
              }
            ]
          },
          {
            name: 'response',
            children: [
              {
                name: 'index.js',
                content: INTERCEPTOR_TPL
              }
            ]
          },
          {
            name: 'index.js',
            content: require(`${PATH_PREFIX}/ajax_interceptor_index`)
          }
        ]
      },
      {
        name: 'index.js',
        content: require(`${PATH_PREFIX}/ajax_index`)
      }
    ]
  }
]
