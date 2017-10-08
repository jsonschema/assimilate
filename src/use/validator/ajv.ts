import { Validation } from '../../Validator';
declare var ajv: any;

if (ajv) {
  Validation.add('ajv', (ajv) => {
    const env = ajv();
    const { addSchema, validate } = env;

    return Object.assign(env, {
      addSchema: (schema, key) => addSchema(key, schema),
      validate: (path, obj) => (validate(path, obj) ? '' : 'error'),
    });
  });
};