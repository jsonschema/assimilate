import { Assimilate, Validator, ValidatorInstance } from '../../Validator';
import { JSONSchema4 } from '../../json-schema';

try {
  const ajv: any = require('ajv');
  Validator.addLibrary('ajv', Assimilate(ajv, (source: any) => {
    const env = source({allErrors: true});
    const { addSchema, validate } = env;
    let errors: Array<Object> = [];

    const library: ValidatorInstance = (<any>Object).assign(env, {
      addSchema: (key: string, schema: JSONSchema4) => {
        addSchema.call(env, schema, key);
      },
      validate: (path: string, instance: object) => {
        let valid = validate.call(env, path, instance);
        errors = [].concat(env.errors);
        return valid;
      },
      getErrors: () => {
        let result = errors.filter((n) => { return [undefined, null].indexOf(n) === -1; });
        return [].concat(result);
      },
    });

    return library;
  }));
} catch (e) { }
