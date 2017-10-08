# Assimilate JSON Schema Validator Interface
**Note: nothing works yet except basic TS build and packaging, still doesn't run tests properly, come back in a month or more**

Installation and usage
===================================

*ES6 via npm*
```cmd
npm install @json-schema/assimilate --save-dev
```

To import the entire core set of functionality:
```javascript
import Assimilate from '@json-schema/assimilate/Assimilate';
 
Assimilate.Validator.use(schema).lib(['draft4','$data']).compile()
```

To import only what you need by patching (this is useful for size-sensitive bundling):
```javascript
import { Validator } from '@json-schema/assimilate/Validator';
import 'assimilate/use/ajv';
import 'assimilate/add/operator/is';
import 'assimilate/add/operator/not';
import 'assimilate/add/operator/find';
import 'assimilate/add/operator/filter';
import 'assimilate/add/operator/compile';
import 'assimilate/add/operator/compileAsync';
import 'assimilate/add/operator/validateSchema';
import 'assimilate/add/operator/getSchema';
import 'assimilate/add/operator/removeSchema';
import 'assimilate/add/output/verbose';
import 'assimilate/add/output/use-json-pointer';
import 'assimilate/util/JSONRef';

Validator.Use(schema).of(1,2,3).map(x => x + '!!!'); // etc 
```
To compile tests for re-use:
```javascript
import Assimilate from '@json-schema/assimilate/Assimilate';
 
let test = Assimilate.Validator.use(schema).lib(['draft4','$data']).compile(path);
let errors = test(data);
```

## Goals
- Provide a consistent interface to use for running JSON Schema validation so that if
  a library is discontinued like tv4 it is easier to switch to a current and actively 
  maintained validator.
- Provide utilities common to JSON Schema usage scenarios with standardised interfaces.
- Make it as easy as possible to keep code size as small as possible.
- Make testing and comparing validators and utils as easy as possible to keep the user 
  base informed and boost competition.
- Add build and test scripts
- Add performance tests
- Add documentation


## Keeping Track
A header will is appended to each file to indicate version information

```javascript
/*!
 * Assimilate JSON Schema Validator Interface
 * @version 1.0.0-alpha.0
 * @date Sat, 01 Oct 2017 03:55:15 GMT
 * @link https://github.com/json-schema-form/assimilate
 * @license MIT
 * Copyright (c) 2017-2018 JSON Schema Form
 */
```

## Contributing / Plans
Please contact @Anthropic via [Gitter](https://gitter.im/Anthropic) if you wish to get involved.
