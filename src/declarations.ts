import { JSONSchema4, JSONSchema4TypeName, JSONSchema4Type } from './json-schema';
/*!
 * I am the interfaces for the Assimilate library
 */
export interface AssimilateAPI {
  test?: Function;
  is?: Function;
  not?: Function;
  find?: Function;
  filter?: Function;
  match?: Function;
}

/**
 * I am the set of Default Options for the library meta
 */
export interface DefaultOptions  {
  verbose: boolean;
  pointer: string;
  remote: boolean;
}

/**
 * I am the set of Default Options required for the library meta
 */
export interface RequiredOptions extends DefaultOptions  {}

/**
 * I am the required method set for a library or library wrapper
 */
export declare class ValidatorLibraryInstance {
  constructor();
  addSchema?(schema: JSONSchema4): void;
  addMetaSchema?(): void;
  validate?(this: ValidatorLibraryInstance, path: string, instance: any): boolean;
  getErrors?(): Array<object>;
  errors?: string | object;
  //validate?(path: string, instance: any): boolean;
  [x: string]: any;
}
