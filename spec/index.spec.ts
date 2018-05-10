/* tslint:disable:quotemark */
import { expect, should } from 'chai';
import * as Assimilate from '../';
import {
  ValidatorLibraryInstance,
  AssimilateAPI,
  DefaultOptions,
  RequiredOptions,
} from '../dist/package/declarations';

/**
 * I output console.log statement output when passed "-- --showlog"
 * @example npm run test -- --showlog
 */
const debug = (process.argv.indexOf('--showlog') !== -1) ? 1 : 0;

// Store library list before adding test entries
const libraries: string[] = Object.keys(Assimilate.Validator.libraries);

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

    describe('addMetaSchema', () => {
      it('adds the meta schema to define supported schema properties'/*, () => {
        Assimilate.Validator.addMetaSchema
      }*/);
    });

    describe('test() raw execution', () => {
      it('run raw tests from the validator library', () => {
        let stringTest = {
          "type": "object",
          "properties": {
            "test": {
              "type": "string"
            }
          },
          "required": [
            "test"
          ]
        };

        Assimilate.Validator.use('djv');
        Assimilate.Validator.libraries['djv'].should.eq(Assimilate.Validator.libraries[Assimilate.Validator.using]);
        Assimilate.Validator.addSchema('stringTest', stringTest);
        if (debug) { console.log(Assimilate.Validator.validateRaw); }
        let result = Assimilate.Validator.validateRaw('stringTest', {});
        if (debug) { console.log(result); }
      });
    });

    describe('addSchema/validate', () => {
      for (let i = 0; i < libraries.length; i++) {
        let lib = libraries[i];
        describe(lib, () => {
          it('validates arrays', () => {
            let arrayTest = {
              "id": "arrayTest",
              "type": "object",
              "properties": {
                "test": {
                  "type": "array",
                  "items": {
                    "type": "object",
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

            Assimilate.Validator.use(lib);
            Assimilate.Validator.addSchema('arrayTest' + lib, arrayTest);
            Assimilate.Validator.validate('arrayTest' + lib, { "test": [{ "alpha": "4" }, { "alpha": 4 }]});
            if (debug) { console.log('arrayTest ' + lib, Assimilate.Validator.getErrors()); };
          });

          it('validates enums', () => {
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

            Assimilate.Validator.addSchema('enumTest' + lib, enumTest);
            Assimilate.Validator.validate('enumTest' + lib, { "test": 'A' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            Assimilate.Validator.getErrors().length.should.eq(0);
            if (debug) { console.log('enumTest ' + lib + ' pass', Assimilate.Validator.getErrors()); };
            Assimilate.Validator.validate('enumTest' + lib, { "test": 'B' });
            Assimilate.Validator.getErrors().should.be.an('Array');
            if (debug) { console.log('enumTest ' + lib + ' fail', Assimilate.Validator.getErrors()); };
          });

          it('validates oneOf', () => {
            let ofTest = {
              "id": "ofTest",
              "type": "object",
              "properties": {
                "test": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "oneOf": [
                      { "properties": { "alpha": { "type": "string" }}, "additionalProperties": false },
                      { "properties": { "beta": { "type": "string" }}, "additionalProperties": false }
                    ]
                  }
                }
              },
              "required": [
                "test"
              ]
            };

            Assimilate.Validator.addSchema('ofTest', ofTest);
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
//            Assimilate.Validator.getErrors().length.should.eq(0);
            if (debug) { console.log('ofTest ' + lib + ' pass', Assimilate.Validator.getErrors()); };
            Assimilate.Validator.validate('ofTest', { "test": [{ "alpha": "a" }, { "gamma": "4" }]});
            Assimilate.Validator.getErrors().should.be.an('Array');
            Assimilate.Validator.getErrors().length.should.not.eq(0);
            if (debug) { console.log('ofTest ' + lib + ' fail', Assimilate.Validator.getErrors()); };
          });
        });
      }
    });

    describe('compile', () => {
      it('generates compile function'/*, () => {
        // I should return a compiled function to validate an object against
      }*/);

      it('validates with compiled function'/*, () => {
      }*/);
    });
  });
});
