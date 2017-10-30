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
        let enumTest = {
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
        let ofTest = {
          "id": "ofTest",
          "type": "object",
          "properties": {
            "test": {
              "type": "array",
              "items": {
                "type":"object",
                "oneOf": [
                  { "properties": { "alpha": { "type": "string" }}},
                  { "properties": { "beta": { "type": "string" }}}
                ]
              }
            }
          },
          "required": [
            "test"
          ]
        };

        describe('djv', () => {
          it('validates against djv', () => {
            Assimilate.Validator.use('djv');
            Assimilate.Validator.addSchema('arrayTestdjv', arrayTest);
            Assimilate.Validator.validate('arrayTestdjv', { "test": [{ "alpha": "4" }, { "alpha": 4 }]});
            console.log("arrayTest djv", Assimilate.Validator.getErrors());

            Assimilate.Validator.addSchema('enumTestdjv', enumTest);
            Assimilate.Validator.validate('enumTestdjv', { "test": 'A' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("enumTest djv pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('enumTestdjv', { "test": 'B' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("enumTest djv fail", Assimilate.Validator.getErrors());

            Assimilate.Validator.addSchema('ofTest', ofTest);
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest djv pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }, { "gamma": "4" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest djv fail", Assimilate.Validator.getErrors());
          });
        });

        describe('ajv', () => {
          it('validates against ajv', () => {
            Assimilate.Validator.use('ajv');
            Assimilate.Validator.addSchema('arrayTestajv', arrayTest);
            Assimilate.Validator.validate('arrayTestajv', { "test": [{ "alpha": "4" }, { "alpha": 4 }]});
            console.log("arrayTest ajv", Assimilate.Validator.getErrors());

            Assimilate.Validator.addSchema('enumTestajv', enumTest);
            Assimilate.Validator.validate('enumTestajv', { "test": 'A' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("enumTest ajv pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('enumTestajv', { "test": 'B' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            let enumTestAJVFail = Assimilate.Validator.getErrors();
            enumTestAJVFail.length.should.eq(1);
            console.log("enumTest ajv fail", enumTestAJVFail);
            
            Assimilate.Validator.addSchema('ofTest', ofTest);
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest ajv pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }, { "gamma": "4" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest ajv fail", Assimilate.Validator.getErrors());
          });
        });

        describe('tv4', () => {
          it('validates against tv4', () => {
            Assimilate.Validator.use('tv4');
            Assimilate.Validator.addSchema('arrayTesttv4', arrayTest);
            Assimilate.Validator.validate('arrayTesttv4', { "test": [{ "alpha": "4" }, { "alpha": 4 }]});
            console.log("arrayTest tv4", Assimilate.Validator.getErrors());

            Assimilate.Validator.addSchema('enumTesttv4', enumTest);
            Assimilate.Validator.validate('enumTesttv4', { "test": 'A' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("enumTest tv4 pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('enumTesttv4', { "test": 'B' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            let enumTestTV4Fail = Assimilate.Validator.getErrors();
            enumTestTV4Fail.length.should.eq(1);
            console.log("enumTest tv4 fail", enumTestTV4Fail);
            
            Assimilate.Validator.addSchema('ofTest', ofTest);
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest tv4 pass", Assimilate.Validator.getErrors());
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }, { "gamma": "4" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            console.log("ofTest tv4 fail", Assimilate.Validator.getErrors());
          });
        });
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
