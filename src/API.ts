import { ValidatorLibraryInstance, AssimilateAPI } from './declarations';
import { partial } from './use/utils/Partial';

/**
 * @function
 * @name test
 * @description
 * Validate object along with schema
 *
 * @requires env::validate
 *
 * @param {object} env
 * @param {object|string} path
 * @param {object} instance
 * @returns {boolean} isValid
 */
const test = partial((env: ValidatorLibraryInstance, path: string, instance: object) => env.validate(path, instance));

/**
 * @function
 * @name is
 * @description
 * Validate object along with schema
 *
 * @requires env::validate
 *
 * @param {object} env
 * @param {object|string} path
 * @param {object} instance
 * @returns {boolean} isValid
 */
const is = partial((env: ValidatorLibraryInstance, path: string, instance: object) => !!env.validate(path, instance));

/**
 * @function
 * @name not
 * @description
 * Validate object along with negative schema context
 *
 * @requires env::validate
 *
 * @param {object} env
 * @param {object|string} path
 * @param {object} instance
 * @returns {boolean} isNotValid
 */
const not = partial((env: ValidatorLibraryInstance, path: string, instance: object) => !env.validate(path, instance));

/**
 * @function
 * @name find
 * @description
 * Finds & returns first appropriate instance
 *
 * @requires is
 *
 * @param {object|array} references
 * @param {object} instance
 * @returns {?}
 */
const find = partial((env: ValidatorLibraryInstance, references: Array<any> | object, instance: object) => {
  const isArray = Array.isArray(references);
  const foundKey = (<any>Object.keys(references))
    .find((path: string) =>
      is(env, isArray ? references[path] : path, instance)
    );

  const found = isArray ? +foundKey : references[foundKey];
  return typeof foundKey === 'undefined' ? undefined : found;
});

/**
 * @function
 * @name filter
 * @description
 * Filters & returns appropriate instances
 *
 * @requires is
 *
 * @param {object/array} references
 * @param {object} instance
 * @returns {array} indexes
 */
const filter = partial((env: ValidatorLibraryInstance, references: Array<any> | object, instance: object) => {
  const isArray = Array.isArray(references);
  return Object.keys(references)
    .filter(path =>
      is(env, isArray ? references[path] : path, instance)
    )
    .map(foundKey => (isArray ? +foundKey : references[foundKey]));
});

/**
 * @function
 * @name match
 * @description
 * Finds & execute appropriate instance
 *
 * @requires find
 *
 * @param {object} env
 * @param {object/array} references
 * @param {object} instance
 * @returns {?}
 */
const match = partial((env: ValidatorLibraryInstance, references: Array<any> | object, instance: object) => {
  const fn = find(env, references, instance);
  if (typeof fn === 'function') {
    return fn(instance);
  }

  return fn;
});

const api: AssimilateAPI = {
  test,
  is,
  not,
  find,
  filter,
  match,
};

export { api };
