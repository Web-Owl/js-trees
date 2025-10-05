import _ from 'lodash'

const list = [1, 2, [3, 5], [[4, 3], 2]];

flatten(list); // [1, 2, 3, 5, 4, 3, 2]
console.log(flatten(list));

const flatten = list => list.reduce((acc, element) => {
  const result = (Array.isArray(element) ? [...acc, ...flatten(element)] : [...acc, element])
  return result
}, [])