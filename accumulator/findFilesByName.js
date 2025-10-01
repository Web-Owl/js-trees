// @ts-check

import path from 'path'
import * as fsTrees from '@hexlet/immutable-fs-trees'

// BEGIN (write your solution here)
// const findFilesByName = (tree, substr) => {
//   const iter = (node, ancestry) => {
//     const name = fsTrees.getName(node)
//     const children = fsTrees.getChildren(node)
//     const newancestry = path.join(ancestry, name);

//     if (fsTrees.isFile(node)) {
//        return name.uncludes(substr) ? name : '';
//     }

//     return children
//       .filter(fsTrees.isDirectory)
//       .flatMap(child => iter(child, newancestry))

//   }

//   // Начинаем с глубины 0
//   return iter(tree, "")
// }

const findFilesByName = (tree, search) => {
  const iter = (node, ancestry) => {
    const name = fsTrees.getName(node)
    const newAncestry = path.join(ancestry, name)
    if (fsTrees.isFile(node)) {
      return name.includes(search) ? newAncestry : []
    }

    const children = fsTrees.getChildren(node)
    return children.flatMap(child => iter(child, newAncestry))
  }

  return iter(tree, '')
}

export default findFilesByName
// END
