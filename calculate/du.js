// @ts-check

import _ from 'lodash'
import * as fsTrees from '@hexlet/immutable-fs-trees'

// BEGIN (write your solution here)
const du = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children
    .map(child => [fsTrees.getName(child), calculateFilesSize(child)])

  result.sort(([, size1], [, size2]) => size2 - size1);
  return result
}

const calculateFilesSize = (tree) => {
  if (fsTrees.isFile(tree)) {
    const meta = _.cloneDeep(fsTrees.getMeta(tree))
    return meta.size
  }

  const children = fsTrees.getChildren(tree)
  const sizes = children.map(calculateFilesSize)
  return _.sum(sizes)
}

export default du
// END
