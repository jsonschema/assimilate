import { expect, should } from 'chai';
import * as djv from 'djv';
import { Validation } from '../dist/package/Validator';
import { Validator } from '../dist/package/Assimilate';
import '../dist/package/use/validator/djv';
import {
  ValidationLibraryInstance,
  AssimilateAPI,
  DefaultOptions,
  RequiredOptions,
} from '../dist/package/declarations';

should();


describe('Assimilate', () => {
  it('exists', () => {
    Validation.should.be.a('object');
  });
  it('added djv', () => {
    Validation.using.should.eq('djv');
  });

  describe('addLibrary', () => {
    it('should addLibrary', () => {
      class testTrue implements ValidationLibraryInstance {
        constructor() {}
        addSchema() {}
        addMetaSchema() {}
        validate(path: string, instance: object): boolean {
          return true;
        }
      }
      // console.log('Validation.libraries', Validation.libraries['djv'].lib.toString());
      Validation.libraries.should.be.a('object');
      Validation.libraries.should.not.haveOwnProperty('test');
      Validation.addLibrary('test', testTrue);
      Validation.libraries.should.haveOwnProperty('test');
      Validation.using.should.eq('test');
    });
  });

  describe('use', () => {
    it('switches library', () => {
    });
  });
  
  describe('addSchema', () => {
    it('adds a schema to validate against', () => {
    });
  });

  describe('addMetaSchema', () => {
    it('adds the meta schema to define supported schema properties', () => {
    });
  });
});