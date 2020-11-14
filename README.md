# Nested Response
Make nested response from flat records

## Installation

```bash
$ npm install nested-response
```

## Usage

```javascript
const nestedResponse = require('nested-response');

// This is a sample of flat records that we're going to make it nested
// You might get these records from anywhere (i.e. SQL databases)
const records = [
  {
    storeId: 1,
    storeName: 'store A',
    productId: 1,
    productName: 'product A',
  }
  {
    storeId: 1,
    storeName: 'store A',
    productId: 2,
    productName: 'product B',
  }
  {
    storeId: 2,
    storeName: 'store B',
    productId: 3,
    productName: 'product C',
  }
];

// You need to define a pattern for nesting
// Also have some options for customizing the output
const definition = [{
  storeId: 'storeId',
  storeName: 'storeName',
  products: [{
    id: 'productId',
    name: 'productName',
  }]
}];

const nestedResult = nestedResponse(records, definition);

// nestedResult: [
//   {
//     storeId: 1,
//     storeName: 'store A',
//     products: [
//       {
//         id: 1,
//         name: 'product A',
//       },
//       {
//         id: 2,
//         name: 'product B',
//       }
//     ]
//   },
//   {
//     storeId: 2,
//     storeName: 'store B',
//     products: [
//       {
//         id: 3,
//         name: 'product C',
//       }
//     ]
//   }
// ];
```

> The `primary key` is defined the first property in each level of nesting (by default)

### Options

You also have some options to customize the output

For example:

You can change the `primary key` field:

```javascript
  storeName: { $column: 'storeName', $pk: true }
```

You can also change the type of value or define a default value if the field doesn't exist on the record:

```javascript
  prodSerial: { $column: 'productSerialNumber', $type: 'number', $default: 123456 }
```

*If you're going to use these options, the `$column` property is mandatory*
