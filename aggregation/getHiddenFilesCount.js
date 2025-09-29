// @ts-check

import _ from 'lodash'
import * as fsTrees from '@hexlet/immutable-fs-trees'

// BEGIN (write your solution here)
const getHiddenFilesCount = (node) => {
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return name.startsWith('.') ? 1 : 0
  }

  const children = fsTrees.getChildren(node)
  const hiddenFilesCounts = children.map(getHiddenFilesCount)
  return _.sum(hiddenFilesCounts)
}

export default getHiddenFilesCount
// END
