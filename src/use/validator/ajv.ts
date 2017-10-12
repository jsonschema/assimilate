import { Assimilate, Validator } from '../../Validator';
try {
  const ajv = require('ajv');
  Validator.addLibrary('ajv', Assimilate(ajv, (source) => {
    const env = source();
    const { addSchema, validate } = env;

    return (<any>Object).assign(env, {
      addSchema: (schema, key) => addSchema(key, schema),
      validate: (path, obj) => (validate(path, obj) ? '' : 'error'),
    });
  }));
} catch (e) { }
