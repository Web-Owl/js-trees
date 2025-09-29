import * as fsTrees from '@hexlet/immutable-fs-trees'
import _ from 'lodash'

const downcaseFileNames = (node) => {
  const newMeta = _.cloneDeep(fsTrees.getMeta(node))
  const name = fsTrees.getName(node)
  if (fsTrees.isFile(node)) {
    return fsTrees.mkfile(name.toLowerCase(), newMeta)
  }

  const children = fsTrees.getChildren(node)
  const newChildren = children.map(downcaseFileNames)

  return fsTrees.mkdir(name, newChildren, newMeta)
}

export default downcaseFileNames