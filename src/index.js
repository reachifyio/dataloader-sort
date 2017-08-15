// @flow
const getMapKey = (data : Object, keyObject : Object) : string => {
  const filteredData = {};
  const keys = Object.keys(keyObject);
  keys.sort();
  keys.forEach(key => (filteredData[key] = data[key]));
  return JSON.stringify(filteredData);
};

type OptionsType = string | {| prop?: string, arrayOutputs?: boolean |};

const sort = (
  keys: (number | string | Object)[],
  data: Object[],
  options?: OptionsType = 'id',
) : (Object | null)[] => {
  let prop: string;
  let arrayOutputs: boolean = false;

  debugger;

  if (typeof options === 'object') {
    prop = options.prop || 'id';
    arrayOutputs = options.arrayOutputs || false;
  } else if (typeof options === 'string') {
    prop = options;
  } else {
    prop = 'id';
  }

  if (!keys.length) return [];
  if (!data.length) return new Array(keys.length).fill(null);

  const areKeysObjects = typeof keys[0] === 'object';
  const map = [];

  // Map data with retrievable keys
  data.forEach(d => {
    const mapKey = areKeysObjects ? getMapKey(d, keys[0]) : d[prop];

    if (arrayOutputs) {
      if (!map[mapKey]) {
        map[mapKey] = [];
      }

      map[mapKey].push(d);
    } else {
      if (map[mapKey]) {
        throw new Error(`Multiple options in data matching key ${String(mapKey)}`);
      }

      map[mapKey] = d;
    }
  });


  return keys.map(key => {
    const mapKey = (typeof key === 'object') ? getMapKey(key, key) : key;
    return map[mapKey] || null;
  });
};

export default sort;
