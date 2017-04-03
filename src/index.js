const matchesObjectFields = (data : Object, check : Object) : boolean => {
  let match = true;
  Object.keys(check).forEach(key => {
    if (check[key] !== data[key]) match = false;
  });
  return match;
};

const sort = <Data: { id?: number }>(
  keys: (number | string | Object)[],
  data: Data[],
  prop?: string = 'id',
) : (Data | null)[] => {
  if (!keys.length) return [];
  if (!data.length) return new Array(keys.length).fill(null);

  return keys.map(key => {
    const match = data.filter(d => {
      if (typeof key === 'object') return matchesObjectFields(d, key);
      return d[prop] === key;
    });

    if (match && match.length > 1) {
      throw new Error(`Multiple options in data matching key ${String(key)}`);
    }

    return match[0] || null;
  });
};

export {
  sort,
};
