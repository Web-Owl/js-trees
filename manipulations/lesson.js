// Базовые операции с узлами

import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [fsTrees.mkfile('hexlet.log')], { hidden: true })
fsTrees.getName(tree) // '/'
fsTrees.getMeta(tree).hidden // true

const [file] = fsTrees.getChildren(tree)
fsTrees.getName(file) // 'hexlet.log'

// У файла нет метаданных
fsTrees.getMeta(file).unknown // undefined

// А вот так делать не надо
// У файлов нет детей
fsTrees.getChildren(file)

// Дополнительно в пакете есть две функции для проверки типа. С их помощью можно
// выборочно работать с файлами и директориями:
import * as fsTrees from '@hexlet/immutable-fs-trees'

const tree = fsTrees.mkdir('/', [fsTrees.mkfile('hexlet.log')], { hidden: true })
fsTrees.isDirectory(tree) // true
fsTrees.isFile(tree) // false

const [file] = fsTrees.getChildren(tree)
fsTrees.isFile(file) // true
fsTrees.isDirectory(file) // false

// Изменение имени файла
const file = fsTrees.mkfile('one', { size: 35 })

// При переименовании важно сохранить метаданные
// _ – lodash
const newMeta = _.cloneDeep(fsTrees.getMeta(file))
const newFile = fsTrees.mkfile('new name', newMeta)

// Сортировка содержимого директории

// Сортировка в обратном порядке
const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children = fsTrees.getChildren(tree)
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
// reverse изменяет массив, поэтому клонируем
const newChildren = [...children].reverse()
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'three', children: [], meta: {}, type: 'directory' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'one', meta: {}, type: 'file' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }


// Обновление содержимого директории

// Приведение к нижнему регистру имён директорий и файлов
// внутри конкретной директории
const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('oNe'),
  fsTrees.mkfile('Two'),
  fsTrees.mkdir('THREE'),
])

const children = fsTrees.getChildren(tree)
const newChildren = children.map((child) => {
  const name = fsTrees.getName(child)
  const newMeta = _.cloneDeep(fsTrees.getMeta(child))
  if (fsTrees.isDirectory(child)) {
    const children = [...fsTrees.getChildren(child)]
    return fsTrees.mkdir(name.toLowerCase(), children, newMeta)
  }
  return fsTrees.mkfile(name.toLowerCase(), newMeta)
})
// Обязательно копируем метаданные
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [
// =>     { name: 'one', meta: {}, type: 'file' },
// =>     { name: 'two', meta: {}, type: 'file' },
// =>     { name: 'three', children: [], meta: {}, type: 'directory' }
// =>   ],
// =>   meta: {},
// =>   type: 'directory'
// => }

// Удаление файлов внутри директории
const tree = fsTrees.mkdir('/', [
  fsTrees.mkfile('one'),
  fsTrees.mkfile('two'),
  fsTrees.mkdir('three'),
])

const children = fsTrees.getChildren(tree)
const newChildren = children.filter(fsTrees.isDirectory)
const newMeta = _.cloneDeep(fsTrees.getMeta(tree))
const tree2 = fsTrees.mkdir(fsTrees.getName(tree), newChildren, newMeta)
console.log(tree2)
// => {
// =>   name: '/',
// =>   children: [ { name: 'three', children: [], meta: {}, type: 'directory' } ],
// =>   meta: {},
// =>   type: 'directory'
// => }