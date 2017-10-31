# Assimilate JSON Schema Validator Interface
**Note: nothing works yet except basic TS build and packaging, still doesn't run tests properly, come back in a month or more**

Installation and usage PLAN, NOT WORKING YET!!
===================================
Below are the desired outcomes and ideas in-progress for what this library will be. For the next month or so it will 
change a lot and nothing is set yet, *so don't use it*.

*ES6 via npm*
```cmd
npm install @jsonschema/assimilate --save-dev
```

To import the entire core set of functionality:
```javascript
import Assimilate from '@jsonschema/assimilate/Assimilate';
 
Assimilate.Validator.addSchema('arrayTest', {...});
Assimilate.Validator.validate('arrayTest', { "test": [{ "alpha": "4" }]});
```

To import only what you need by patching (this is useful for size-sensitive bundling):
```javascript
import { Validator } from '@jsonschema/assimilate/Validator';
import '@jsonschema/assimilate/use/validator/djv';
import '@jsonschema/assimilate/use/util/JSONRef';
import '@jsonschema/assimilate/add/operator/is';
import '@jsonschema/assimilate/add/operator/not';
import '@jsonschema/assimilate/add/operator/find';
import '@jsonschema/assimilate/add/operator/filter';
import '@jsonschema/assimilate/add/operator/compile';
import '@jsonschema/assimilate/add/operator/compileAsync';
import '@jsonschema/assimilate/add/operator/validateSchema';
import '@jsonschema/assimilate/add/operator/getSchema';
import '@jsonschema/assimilate/add/operator/removeSchema';
import '@jsonschema/assimilate/add/output/verbose';
import '@jsonschema/assimilate/add/output/use-json-pointer';

Validator.addSchema(schema); // etc 
let test = Validator.compile(path);
let errors = test(data);
```
To compile tests for re-use: NOT IMPLEMENTED YET
```javascript
import Assimilate from '@jsonschema/assimilate/Assimilate';
 
let test = Assimilate.Validator.addSchema(schema).useMetaSchema(['draft4','draft6','$data']).compile();
let errors = test(data);
```

## Goals
- [x] Add wrappers for Ajv/Djv/Tv4 to start with as PoC.
- [x] Add build and test scripts.
- [ ] Provide a consistent interface to use for running JSON Schema validation so that if
  a library is discontinued like tv4 it is easier to switch to a current and actively 
  maintained validator.
- [ ] Provide utilities common to JSON Schema usage scenarios with standardised interfaces.
- [ ] Make it as easy as possible to keep code size as small as possible.
- [ ] Make testing and comparing validators and utils as easy as possible to keep the user 
  base informed and boost competition.
- [ ] Add performance tests.
- [ ] Add documentation.


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
**Note**: Currently when running npm install there are errors thrown, these do not affect what should be working
they are items I haven't finished implementing yet. I will go through and clean them out soon.

To view the available `package.json` script you can run `npm run info`
The remaining scripts are perf/browser/commit/cover/tests2png and their immediate relatives. Builds, tests and lints 
are all in some stage of working condition.

Please contact @Anthropic via [Gitter](https://gitter.im/Anthropic) if you wish to get involved.

## Acknowledgements
I (@Anthropic) would like to thank @korzio for [jvu](https://github.com/korzio/jvu) which inspired this 
entire project and leans heavily on its code for the initial drafts.

The whole template for the library including the build scripts and even parts of this README.md file 
are taken from [RxJS](https://github.com/ReactiveX/RxJS) as a starting point.
