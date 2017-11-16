import { api } from './API';
import { JSONSchema4, JSONSchema4TypeName, JSONSchema4Type } from './json-schema';
import {
  ValidatorLibraryInstance,
  AssimilateAPI,
  DefaultOptions,
  RequiredOptions,
} from './declarations';

/**
 * @module @json-schema/assimilate
 * @name assimilate
 * @description
 * Assimilate package wraps json schema validator environment with a set of utilities
 */
/**
 * @function
 * @name Assimilate
 * @description
 * Entry point for Assimilate package
 *
 * @param {function} validator I am an external 3rd party validator library 
 * @param {function?} adapter  I am a wrapper able to coerce validator behaviour to be inline with desired capabilities
 * @returns {function} is      I am a function for returning a true/false result to a validation request
 */
export const Assimilate = (validator: Function, adapter?: Function): ValidatorLibraryInstance => {
  let env: ValidatorLibraryInstance;

  switch (typeof adapter) {
    case 'function':
      env = adapter(validator);
      break;
    case 'undefined':
    default:
      env = validator();
  }

  const {
    addSchema,
    validate,
  } = env;

  const apis: AssimilateAPI = Object.keys(api)
    .reduce(
      (accumulator, key: string, currentIndex: number, source: string[]) => (<any>Object).assign({
        [key]: api[key](env),
      }, accumulator)
    , {});

  // Entry point for generated environment
  (<any>Object).assign(
    apis.is,
    env,
    {
      env,
      addSchema: addSchema,
      validate: apis.is,
    },
    apis,
  );

  return apis.is;
};

/**
 * I am a Validator class instance and I am usable with the
 * 'new' keyword to obtain multiple instances
 */
export class ValidatorInstance {
  public libraries: Object;
  public operators: Object;
  public errors: Array<object>;

  public using: string;

  constructor () {
    this.libraries = {};
  }

  addLibrary (name: string, library: ValidatorLibraryInstance, defaultOptions?: object, requiredOptions?: object) {
    this.libraries[name] = {
      name,
      lib: library,
      ro: requiredOptions,
      do: defaultOptions
    };

    this.using = name;

    return this;
  }

  use (library: string) {
    this.using = library;

    return this;
  }

  /**
   * @param namespace  I am the reference to the schema to be used in jsonref or jsonpath
   * @param jsonSchema The schema to validate against
   */
  addSchema (namespace: string, jsonSchema: JSONSchema4) {
    if (!this.libraries || !this.libraries[this.using]) {
      throw ('A validation library must be provided prior to adding a schema');
    };

    this.libraries[this.using].lib.addSchema(namespace, jsonSchema);

    return this;
  }

  validate (namespace: string, instance: any) {
    if (!this.libraries || !this.libraries[this.using]) {
      throw ('A validation library must be provided prior to adding a schema');
    };

    let valid = this.libraries[this.using].lib.validate(namespace, instance);
    this.errors = this.libraries[this.using].lib.getErrors();

    return valid;
  }

  getErrors (): Array<object> {
    return this.errors;
  }
}

/**
 * I am a singleton export, all importers of me will be using the same instance
 */
export let Validator = new ValidatorInstance();

/**
 * I am a prototype export, all importers of me will be using a separate instance
 */
export const Validate = new ValidatorInstance();

/*
Assimilate JSON Schema Validator Interface
Ajsvi
VALIDATION
===================================
import { Validator } from '@json-schema/assimilate/Validator';
import 'assimilate/use/AJV';
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

ES6
===================================
import Ajsvi from '@json-schema/assimilate/Ajsvi';

Ajsvi.Validator.Use(schema).With().(1,2,3);
*/
