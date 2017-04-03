# DataLoader Sort
Sort function for DataLoader to ensure the correct data is returned for the matching keys

## Usage
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
