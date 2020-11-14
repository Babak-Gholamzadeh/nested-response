const convertType = value =>
  ({
    to: type => {
      switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'string':
        return String(value);
      default:
        return value;
      }
    }
  });

module.exports = convertType;
