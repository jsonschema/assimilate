import { Assimilate, Validator } from '../../Validator';
import { JSONSchema4 } from '../../json-schema';
try {
  const ajv: any = require('ajv');
  Validator.addLibrary('ajv', Assimilate(ajv, (source: any) => {
    const env = source();
    const { addSchema, validate } = env;

    return (<any>Object).assign(env, {
      addSchema: (schema: JSONSchema4, key?: string) => addSchema(key, schema),
      validate: (path: string, instance: object) => (validate(path, instance) ? '' : 'error'),
    });
  }));
} catch (e) { }
