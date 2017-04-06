import sort from './src';

const keys = [];
const keysNotUnique = [];
const results = [];
const resultsUnique = [];
const resultsNotUnique = [];
const keyCount = 100;
const uniqueResultMap = new Array(keyCount);
const iterations = 10000;
let id;
let element;
let i;
let ordered;

function getRandomInt(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

// generate keys unique keys and unique results.
// use case number 1
for (i = 0; i < keyCount; i++) {
  keys.push(i);
  results.push({ id: i });
}

// use case number 2 and 3
for (i = 0; i < keyCount; i++) {
  id = getRandomInt(0, 80);
  element = { id };

  keysNotUnique.push(id);
  resultsNotUnique.push(element);

  if (uniqueResultMap[i]) continue;

  resultsUnique.push(element);
  uniqueResultMap[i] = true;
}

// order keys randomly
keys.sort(k => Math.random() - 0.5);

console.time('not-repeated');
for (let j = 0; j < iterations; j++) {
  try {
    ordered = sort(keys, results);
  } catch (err) {
    // console.log(err);
  }
}
console.timeEnd('not-repeated');

console.time('repeated-keys-repeated-values');
for (let j = 0; j < iterations; j++) {
  try {
    ordered = sort(keysNotUnique, resultsNotUnique);
  } catch (err) {
    // console.log(err);
  }
}
console.timeEnd('repeated-keys-repeated-values');

console.time('repeated-keys-unique-values');
for (let j = 0; j < iterations; j++) {
  try {
    ordered = sort(keysNotUnique, resultsUnique);
  } catch (err) {
    // console.log(err);
  }
}
console.timeEnd('repeated-keys-unique-values');

const withNulls = keysNotUnique.concat([
  getRandomInt(90, 200),
  getRandomInt(90, 200),
  getRandomInt(90, 200),
]);
withNulls.sort(() => Math.random() - 0.5);

console.time('repeated-keys-unique-values-and-nulls');

for (let j = 0; j < iterations; j++) {
  try {
    ordered = sort(withNulls, resultsUnique);
  } catch (err) {
    // console.log(err);
  }
}
console.timeEnd('repeated-keys-unique-values-and-nulls');

console.time('empty-keys-with-values');
try {
  ordered = sort(null, results);
} catch (err) {
  // console.log(err);
}
console.timeEnd('empty-keys-with-values');

console.time('with-keys-empty-values');
try {
  ordered = sort(keys, []);
} catch (err) {
  // console.log(err);
}
console.timeEnd('with-keys-empty-values');

process.exit(0);
