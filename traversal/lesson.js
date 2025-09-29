import _ from 'lodash'
import * as fsTrees from '@hexlet/immutable-fs-trees'

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

const dfs = (tree) => {
  // Распечатываем содержимое узла
  console.log(fsTrees.getName(tree))
  // Если это файл, то возвращаем управление
  if (fsTrees.isFile(tree)) {
    return
  }

  // Получаем детей
  const children = fsTrees.getChildren(tree)

  // Применяем функцию dfs ко всем дочерним элементам
  // Множество рекурсивных вызовов в рамках одного вызова функции
  // называется древовидной рекурсией
  children.forEach(dfs)
}

dfs(tree)
// => /
// => etc
// => bashrc
// => consul.cfg
// => hexletrc
// => bin
// => ls
// => cat

const changeOwner = (tree, owner) => {
  const name = fsTrees.getName(tree)
  const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
  newMeta.owner = owner

  if (fsTrees.isFile(tree)) {
    // Возвращаем обновлённый файл
    return fsTrees.mkfile(name, newMeta)
  }
  // Дальше идет работа, если директория

  const children = fsTrees.getChildren(tree)
  // Ключевая строчка
  // Вызываем рекурсивное обновление каждого ребёнка
  const newChildren = children.map(child => changeOwner(child, owner))
  const newTree = fsTrees.mkdir(name, newChildren, newMeta)

  // Возвращаем обновлённую директорию
  return newTree
}

// Эту функцию можно обобщить до map (отображения), работающего с деревьями