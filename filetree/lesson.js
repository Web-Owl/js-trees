import * as fsTrees from '@hexlet/immutable-fs-trees'

// mkdir вторым параметром принимает список детей,
// которые могут быть либо директориями, созданными mkdir,
// либо файлами, созданными mkfile
const tree = fsTrees.mkdir('etc', [
  fsTrees.mkfile('bashrc'),
  fsTrees.mkdir('consul', [
    fsTrees.mkfile('config.json'),
  ]),
])