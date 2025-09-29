const tree = fsTrees.mkdir('/', [
  fsTrees.mkdir('etc', [
    fsTrees.mkfile('bashrc'),
    fsTrees.mkfile('consul.cfg'),
  ]),
  fsTrees.mkfile('hexletrc'),
  fsTrees.mkdir('bin', [
    fsTrees.mkfile('ls'),
    fsTrees.mkfile('cat'),
  ]),
])

// В реализации используем рекурсивный процесс,
// чтобы добраться до самого дна дерева
const getNodesCount = (tree) => {
  if (fsTrees.isFile(tree)) {
    // Возвращаем `1` для учёта текущего файла
    return 1
  }

  // Если узел — директория, получаем его потомков
  const children = fsTrees.getChildren(tree)
  // Здесь начинается самая сложная часть
  // Считаем количество потомков для каждого из потомков,
  // рекурсивно вызывая нашу функцию `getNodesCount`
  const descendantCounts = children.map(getNodesCount)
  // Возвращаем `1` (текущая директория) + общее количество потомков
  return 1 + _.sum(descendantCounts)
}

getNodesCount(tree) // 8