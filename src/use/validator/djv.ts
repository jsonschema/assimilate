import { Assimilate, Validator, ValidatorInstance } from '../../Validator';

try {
  const djv: any = require('djv');
  Validator.addLibrary('djv', Assimilate(djv, (source: any) => {
    let errors: Array<Object> = [];
    const env = source({
      errorHandler(this: any, type: string) {
        let path = this.data.toString().replace(/^data/, '');
        let dataPath: string = path.replace(/\[\'([^\']+)\'\]/ig, '.$1').replace(/\[(i[0-9]*)\]/ig, '[\'+$1+\']');
        let schemaPath: string = '#' + path.replace(/\[i([0-9]*)\]/ig, '/items').replace(/\[\'([^\']+)\'\]/ig, '/properties/$1');
        let schema = this.schema;

        // if([ 'type', 'enum', 'minimum', 'maximum' ].indexOf(type)) {
          schemaPath = schemaPath + '/' + type;
        // };

        // TODO decide if it is worth adding the schema -> schema: this.schema,
        return `{
          let dataPath = '${dataPath}';
          let schemaPath = '${schemaPath}';
          errors.push({
            keyword: '${type}',
            dataPath: dataPath,
            schemaPath: schemaPath
          });
        }`;
      }
    });

    const { validate: test } = env;

    const library: ValidatorInstance = (<any>Object).assign(env, {
      validate: (path: string, instance: object) => {
        let result: string = test.call(env, path, instance);
        let valid: boolean = !result;

        errors.splice(0);

        if (!valid) {
          errors = errors.concat(result);
        };

        return valid;
      },
      getErrors: () => {
        let result = [].concat(errors);

        return result;
      },
    });

    return library;
  }));
} catch (e) { }
