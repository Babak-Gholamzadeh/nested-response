const convertType = require('./convert-type');
const deeplyObjectAssign = require('deeply-object-assign');
const realTypeOf = require('realtypeof');

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
          // If the record value and default value are both undefined, skip that column
          if (
            !['array', 'object'].includes($type) &&
            realTypeOf.isUndefined(record[$column]) &&
            realTypeOf.isUndefined($default)
          ) return;

          nestedObject[pk][defKey] = ['array', 'object'].includes($type) ?
            deeplyObjectAssign(
              nestedObject[pk][defKey] || {},
              makeNestedObject([record], defValue)
            ) :
            convertType(
              !realTypeOf.isUndefined(record[$column]) ?
                record[$column] :
                $default
            ).to($type);
        });
      return nestedObject;
    }, {});
};

module.exports = makeNestedObject;
