const convertType = require('./convert-type');
const deeplyObjectAssign = require('deeply-object-assign');

const makeNestedObject = (data, def) => {
  const {
    $column: {
      _$pk,
      ...restColumns
    }
  } = def;
  return data
    .reduce((nestedObject, record) => {
      const pk = record[_$pk];
      if (pk === null) return nestedObject;
      if (!nestedObject[pk]) nestedObject[pk] = {};
      Object
        .entries(restColumns)
        .forEach(([defKey, defValue]) => {
          const { $column, $type, $default } = defValue;
          nestedObject[pk][defKey] = ['array', 'object'].includes($type) ?
            deeplyObjectAssign(
              nestedObject[pk][defKey] || {},
              makeNestedObject([record], defValue)
            ) :
            convertType(
              record[$column] !== undefined ? record[$column] : $default
            ).to($type);
        });
      return nestedObject;
    }, {});
};

module.exports = makeNestedObject;
