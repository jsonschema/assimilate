import { Assimilate, Validator, ValidatorInstance } from '../../Validator';
import { JSONSchema4 } from '../../json-schema';

try {
  const tv4: any = require('tv4');
  Validator.addLibrary('tv4', Assimilate(tv4, (source: any) => {
    let _env: object = {};
    let _schema: object = {};
    let _errors: Array<Object> = [];

    const library: ValidatorInstance = (<any>Object).assign(_env, {
      addSchema: (key: string, schema: JSONSchema4) => {
        //tv4.addSchema.call(tv4, key, schema);
        _schema[key] = schema;
      },
      validate: (key: string, instance: object) => {
        let result = tv4.validateMultiple.call(tv4, instance, _schema[key]);
        if(Array.isArray(result.errors)) {
          result.error = result.errors.map((elem: any) => {
            return {
              key: elem.schemaPath.split('/').slice(-1).pop(),
              dataPath: elem.dataPath.replace(/\/([0-9]+)/ig, '[$1]').replace(/\/([^\/]+)/ig, '.$1'),
              schemaPath: '#'+elem.schemaPath,
              message: elem.message
            }
          });
        }
        // console.log(result.error);
        _errors = [].concat(result.error);
        return result.valid;
      },
      getErrors: () => {
        let result = _errors.filter((n) => { return n != undefined; });
        return [].concat(result);
      },
    });

    return library;
  }));
} catch (e) { }
