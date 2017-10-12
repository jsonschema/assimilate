import { expect, should } from 'chai';
import * as djv from 'djv';
import * as Assimilate from '../dist/package/Assimilate';
import '../dist/package/use/validator/djv';
import {
  ValidatorLibraryInstance,
  AssimilateAPI,
  DefaultOptions,
  RequiredOptions,
} from '../dist/package/declarations';

should();

describe('Assimilate.Validator', () => {
  it('exists', () => {
    Assimilate.Validator.should.be.a('object');
  });
  it('added djv', () => {
    Assimilate.Validator.using.should.eq('djv');
  });

  describe('addLibrary', () => {
    it('should addLibrary', () => {
      class TestTrue implements ValidatorLibraryInstance {
        constructor() {}
        addSchema() {}
        addMetaSchema() {}
        validate(path: string, instance: object): boolean {
          return true;
        }
      }
      // console.log('Assimilate.Validator.libraries', Assimilate.Validator.libraries['djv'].lib.toString());
      Assimilate.Validator.libraries.should.be.a('object');
      Assimilate.Validator.libraries.should.not.haveOwnProperty('test');
      Assimilate.Validator.addLibrary('test', TestTrue);
      Assimilate.Validator.libraries.should.haveOwnProperty('test');
      Assimilate.Validator.using.should.eq('test');
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
