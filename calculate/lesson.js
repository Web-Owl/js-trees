const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkdir('apache'),
    fsTrees.mkdir('nginx', [
      fsTrees.mkfile('nginx.conf'),
    ]),
  ]),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
    fsTrees.mkfile('file.tmp'),
    fsTrees.mkdir('data'),
  ]),
  fsTrees.mkfile('hosts'),
  fsTrees.mkfile('resolve'),
])

console.log(getSubdirectoriesInfo(tree))
// => [['etc', 1], ['consul', 2]]


const getFilesCount = (node) => {
  if (fsTrees.isFile(node)) {
    return 1
  }

  const children = fsTrees.getChildren(node)
  const descendantCounts = children.map(getFilesCount)
  return _.sum(descendantCounts)
}

const getSubdirectoriesInfo = (tree) => {
  const children = fsTrees.getChildren(tree)
  const result = children
    // Нас интересуют только директории
    .filter(fsTrees.isDirectory)
    // Запускаем подсчёт для каждой директории
    .map(child => [fsTrees.getName(child), getFilesCount(child)])

  return result
}