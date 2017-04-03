# DataLoader Sort
Sort function for DataLoader to ensure the correct data is returned for the matching keys

`npm i -S @reachify/dataloader-sort`

### Basic Usage
```
const keys = [1, 2, 3];
const data = [
  { id: 3, value: 'three' },
  { id: 1, value: 'one' },
  { id: 2, value: 'two' },
];

const result = sort(keys, data);
console.log(result);

/**
 * [
 *  { id: 1, value: 'one' },
 *  { id: 2, value: 'two' },
 *  { id: 3, value: 'three' },
 * ];
 */
```

### Custom Prop Usage
```
const keys = [1, 2, 3];
const data = [
  { other: 3, value: 'three' },
  { other: 1, value: 'one' },
  { other: 2, value: 'two' },
];

const result = sort(keys, data, 'other');
console.log(result);

/**
 * [
 *   { other: 1, value: 'one' },
 *   { other: 2, value: 'two' },
 *   { other: 3, value: 'three' },
 * ];
 */
```

### Object Key Usage
```
const keys = [
  { userId: 1, messageId: 3 },
  { userId: 2, messageId: 4 },
  { userId: 3, messageId: 9 },
  { userId: 3, messageId: 7 },
  { userId: 1, messageId: 2 },
];
const data = [
  { userId: 1, messageId: 2, value: 'yayy' },
  { userId: 3, messageId: 7, value: 'ya' },
  { userId: 1, messageId: 3, value: 'woot' },
  { userId: 2, messageId: 4, value: 'blue' },
  { userId: 3, messageId: 9, value: 'green' },
];

const result = sort(keys, data);
console.log(result);

/**
 * [
 *  { userId: 1, messageId: 3, value: 'woot' },
 *  { userId: 2, messageId: 4, value: 'blue' },
 *  { userId: 3, messageId: 9, value: 'green' },
 *  { userId: 3, messageId: 7, value: 'ya' },
 *  { userId: 1, messageId: 2, value: 'yayy' },
 * ];
 */
```
