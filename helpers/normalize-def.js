const realTypeOf = require('realtypeof');
const getColumnDetails = require('./get-column-detials');

const normalizeDef = def =>
  ({
    $type: realTypeOf(def),
    $column: Object
      .entries(realTypeOf.isArray(def) ? def[0] : def)
      .reduce((acc, [defKey, defValue], index) => {
        const normalDefValue = getColumnDetails(defValue);
        const { $column, $type, $pk } = normalDefValue;
        if (!index || $pk)
          acc['_$pk'] = $column;
        acc[defKey] = ['array', 'object'].includes($type) ?
          normalizeDef($column) :
          normalDefValue;
        return acc;
      }, {})
  });

module.exports = normalizeDef;
