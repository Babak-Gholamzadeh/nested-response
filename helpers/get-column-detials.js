const realTypeOf = require('realtypeof');

const getColumnDetails = defValue => {
  switch (realTypeOf(defValue)) {
  case 'string':
    return {
      $column: defValue,
    };
  case 'array':
    return {
      $column: defValue,
      $type: 'array',
    };
  case 'object':
    if ('$column' in defValue) {
      defValue.$type = defValue.$type ? defValue.$type.toLowerCase() : undefined;
      return defValue;
    }
    return {
      $column: defValue,
      $type: 'object',
    };
  default:
    throw Error(`The definition object has a non-standard value: ${defValue}`);
  }
};

module.exports = getColumnDetails;
