const realTypeOf = require('realtypeof');

const makeNestedArrayOfObject = (data, def) => {
  const { $column, $type } = def;
  const values = Object.values(data);
  const processData = valueObject =>
    Object
      .entries(valueObject)
      .reduce((acc, [key, value]) => {
        acc[key] = realTypeOf.isObject(value) ?
          makeNestedArrayOfObject(value, $column[key]) :
          value;
        return acc;
      }, {});
  return $type === 'array' ?
    values.map(processData) :
    values.reduce((acc, value) => processData(value), {});
};

module.exports = makeNestedArrayOfObject;
