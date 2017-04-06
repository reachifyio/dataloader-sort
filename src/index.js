// @flow
const getMapKey = (data : Object, keyObject : Object) : string => {
  const filteredData = {};
  const keys = Object.keys(keyObject);
  keys.sort();
  keys.forEach(key => (filteredData[key] = data[key]));
  return JSON.stringify(filteredData);
};

const sort = (
  keys: (number | string | Object)[],
  data: Object[],
  prop?: string = 'id',
) : (Object | null)[] => {
  if (!keys.length) return [];
  if (!data.length) return new Array(keys.length).fill(null);

  const map = [];

  // Map data with retrievable keys
  data.forEach(d => {
    const mapKey = (typeof keys[0] === 'object') ? getMapKey(d, keys[0]) : d[prop];

    if (map[mapKey]) {
      throw new Error(`Multiple options in data matching key ${String(mapKey)}`);
    }

    map[mapKey] = d;
  });


  return keys.map(key => {
    const mapKey = (typeof key === 'object') ? getMapKey(key, key) : key;
    return map[mapKey] || null;
  });
};

export default sort;
