// @ts-check
import _ from 'lodash'

// BEGIN (write your solution here)
const changeClass = (tree, classNameFrom, classNameTo) => {
  const innerFunc = (node) => {
    const updatedNode = { ...node }

    if (_.has(node, 'className')) {
      const newClassName = classNameFrom === node.className ? classNameTo : node.className
      updatedNode.className = newClassName
    }

    if (node.type === 'tag-internal') {
      const newChildren = node.children.map(innerFunc)
      updatedNode.children = newChildren
    }

    return updatedNode
  }

  return innerFunc(tree)
}

export default changeClass
// END
