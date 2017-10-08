import { expect, describe, it, any } from 'chai';
import * as djv from 'djv';
import '../dist/package/use/validator/djv';
import { Validator as ajsvi } from '../dist/package/Assimilate';

describe('ajsvi', () => {
  it('exists', () => {
    expect(ajsvi).toEqual(any(Function));
  });

  it('wraps validator', () => {
    const validator = () => ({});
//    const env = ajsvi(validator);

//    expect(env).toEqual(any(Function));
  });

  it('exposes validator api', () => {
    const validator = () => ({
      test: 123,
    });
//    const env = ajsvi(validator);

//    expect(env.test).toEqual(validator().test);
  });

  it('uses adapter api if provided', () => {
    const validator = () => ({});
//    const env = ajsvi(validator, () => ({
//      validate: () => false,
//    }));

//    expect(env.is(null, null)).toEqual(true);
  });
});