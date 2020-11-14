const {
  normalizeDef,
  makeNestedObject,
  makeNestedArrayOfObject,
} = require('./helpers');

const nestedResponse = (data, def) => {
  const normalizedDef = normalizeDef(def);
  const nestedObject = makeNestedObject(data, normalizedDef);
  const nestedArrayOfObject = makeNestedArrayOfObject(nestedObject, normalizedDef);
  return nestedArrayOfObject;
};

module.exports = nestedResponse;
