import _ from 'lodash'
import * as fsTrees from '@hexlet/immutable-fs-trees'

// BEGIN (write your solution here) (write your solution here)
export const compressImages = (node) => {
  const children = fsTrees.getChildren(node)
  const newChildren = children.map((child) => {
    const name = fsTrees.getName(child)
    if (!fsTrees.isFile(child) || !name.endsWith('.jpg')) {
      return child
    }
    const meta = fsTrees.getMeta(child)
    const newMeta = _.cloneDeep(meta)
    newMeta.size /= 2
    return fsTrees.mkfile(name, newMeta)
  })
  const newMeta = _.cloneDeep(fsTrees.getMeta(node))
  return fsTrees.mkdir(fsTrees.getName(node), newChildren, newMeta)
}

const tree = fsTrees.mkdir('my documents', [
  fsTrees.mkfile('avatar.jpg', { size: 100 }),
  fsTrees.mkfile('passport.jpg', { size: 200 }),
  fsTrees.mkfile('family.jpg', { size: 150 }),
  fsTrees.mkfile('addresses', { size: 125 }),
  fsTrees.mkdir('presentations'),
]);

console.log(tree);

const newTree = compressImages(tree);

console.log(newTree);
// То же самое, что и tree, но во всех картинках размер уменьшен в два раза