import { api } from './API';
import { JSONSchema4 } from './json-schema';
import {
  ValidationLibraryInstance,
  AssimilateAPI,
  DefaultOptions,
  RequiredOptions,
} from './declarations'

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
 * @param {function} validator
 * @param {function?} adapter
 * @returns {function} jvuApi
 */
const Assimilate = (validator: Function, adapter: Function) => {
  let env: ValidationLibraryInstance;
  switch (typeof adapter) {
    case 'function':
      env = adapter(validator);
      break;
    case 'undefined':
    default:
      env = validator();
  }

  const {
    addSchema: add,
  } = env;

  const apis: AssimilateAPI = Object.keys(api)
    .reduce(
      (memo, key) => (<any>Object).assign({
        [key]: api[key](env),
      }, memo)
    , {});

  // Entry point for generated environment
  (<any>Object).assign(
    apis.is,
    env,
    {
      env,
      add,
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
export class Validator {
  libraries: Object;
  operators: Object;

  using: string;

  constructor () {
    this.libraries = {};
  }

  addLibrary (name: string, library: ValidationLibraryInstance, defaultOptions?: object, requiredOptions?: object) {
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

  add (namespace: string, jsonSchema: JSONSchema4) {

  }
}

/**
 * I am a singleton export, all importers of me will be using the same instance
 */
export let Validation = new Validator();

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