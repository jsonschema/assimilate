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
  class TestTrue implements ValidatorLibraryInstance {
    addSchema() {}
    addMetaSchema() {}
    validate(path: string, instance: object): boolean {
      return true;
    }
  }
  class TestAddSchema implements ValidatorLibraryInstance {
    addSchema() {}
    addMetaSchema() {}
    validate(path: string, instance: object): boolean {
      return true;
    }
  }

  it('exists', () => {
    Assimilate.Validator.should.be.a('object');
  });
  it('added djv', () => {
    Assimilate.Validator.using.should.eq('djv');
  });

  describe('API', () => {

    describe('addLibrary', () => {
      it('should addLibrary', () => {
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
        Assimilate.Validator.addLibrary('testA', TestTrue);
        Assimilate.Validator.addLibrary('testB', TestTrue);
        Assimilate.Validator.use('testA');
        Assimilate.Validator.libraries['testA'].should.eq(Assimilate.Validator.libraries[Assimilate.Validator.using]);
        Assimilate.Validator.use('testB');
        Assimilate.Validator.libraries['testB'].should.eq(Assimilate.Validator.libraries[Assimilate.Validator.using]);
      });
    });

    describe('addSchema', () => {
      it('adds a schema to validate against', () => {
        let jsonSchemaA = {
          "id": "testA",
          "type": "object",
          "properties": {
            "test": {
              "enum": ["A"]
            }
          },
          "required": [
            "test"
          ]
        };
        let jsonSchemaB = {
          "id": "testB",
          "type": "object",
          "properties": {
            "test": {
              "enum": ["B"]
            }
          },
          "required": [
            "test"
          ]
        };
        let arrayTest = {
          "id": "arrayTest",
          "type": "object",
          "properties": {
            "test": {
              "type": "array",
              "items": {
                "type":"object",
                "properties": {
                  "alpha": { "type": "string" },
                  "beta": { "type": "string" }
                },
                "required": ["alpha"]
              }
            }
          },
          "required": [
            "test"
          ]
        };

        Assimilate.Validator.use('djv');
        Assimilate.Validator.addSchema('arrayTestA', arrayTest);
        Assimilate.Validator.validate('arrayTestA', { test: [{ "alpha": "4" }, { "alpha": 4 }]});
        console.log("arrayTestA", Assimilate.Validator.getErrors());
        Assimilate.Validator.addSchema('testA', jsonSchemaA);
        Assimilate.Validator.validate('testA', { test: 'A' });
        console.log("A -> A", Assimilate.Validator.getErrors());
        Assimilate.Validator.validate('testA', { test: 'B' });
        console.log("A -> B", Assimilate.Validator.getErrors());
        Assimilate.Validator.use('ajv');
        Assimilate.Validator.addSchema('arrayTestB', arrayTest);
        Assimilate.Validator.validate('arrayTestB', { test: [{ "alpha": "4" }, { "alpha": 4 }]});
        console.log("arrayTestB", Assimilate.Validator.getErrors());
        Assimilate.Validator.addSchema('testB', jsonSchemaB);
        Assimilate.Validator.validate('testB', { test: 'A' });
        Assimilate.Validator.getErrors().should.be.an('Array');
        console.log("B -> A", Assimilate.Validator.getErrors());
        Assimilate.Validator.validate('testB', { test: 'B' });
        let test6 = Assimilate.Validator.getErrors();
        test6.length.should.eq(0);
        console.log("B -> B", test6);
      });
    });

    describe('validate', () => {
      it('validates against provided schema', () => {
        let jsonSchemaA = {
          "properties": {
            "common": {
              "properties": {
                "test": {
                  "enum": ["A"]
                }
              },
              "required": [
                "test"
              ]
            }
          }
        };
        let jsonSchemaB = {
          "properties": {
            "common": {
              "properties": {
                "test": {
                  "enum": ["B"]
                }
              },
              "required": [
                "test"
              ]
            }
          }
        };

        // Assimilate.Validator.use('djv');
        // Assimilate.Validator.addSchema('testA', jsonSchemaA);
        // Assimilate.Validator.validate('testA#/common', { type: 'custom' });
        // console.log(Assimilate.Validator.errors);
        // Assimilate.Validator.use('ajv');
        // Assimilate.Validator.addSchema('testB', jsonSchemaB);
        // Assimilate.Validator.validate('testB#/common', { type: 'custom' });
        // console.log(Assimilate.Validator.errors);
        // Assimilate.Validator.errors.should.eq(false);
      });
    });

    describe('addMetaSchema', () => {
      it('adds the meta schema to define supported schema properties', () => {
      });
    });
  });
});
