/**
 * @file lib entry
 * @author Henry Yang
 */

const fs = require('fs')
const path = require('path')
const dirMap = require('./dir_map.js')

function processDir (path, setting) {
  setting.forEach(item => {
    const _path = `${path}/${item.name}`

    // if children is not exist, it's a file
    if (!item.children) {
      fs.writeFileSync(_path, item.content, 'utf-8')
    } else {
      fs.mkdirSync(_path)
      processDir(_path, item.children)
    }
  })
}

module.exports = function (dir) {
  const resolvedPath = path.resolve(process.cwd(), dir)

  // try get access status of ajax file, create directory if ajax dir is not exist.
  try {
    fs.accessSync(`${resolvedPath}/ajax`, fs.constants.R_OK)
  } catch (e) {
    processDir(resolvedPath, dirMap)
  }
}
