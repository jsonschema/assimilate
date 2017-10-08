const Ajsvi = require('../Ajsvi');

describe('jvu', () => {
  it('exists', () => {
    expect(jvu).toEqual(jasmine.any(Function));
  });

  it('wraps validator', () => {
    const validator = () => ({});
    const env = jvu(validator);

    expect(env).toEqual(jasmine.any(Function));
  });

  it('exposes validator api', () => {
    const validator = () => ({
      test: 123,
    });
    const env = jvu(validator);

    expect(env.test).toEqual(validator().test);
  });

  it('uses adapter api if provided', () => {
    const validator = () => ({});
    const env = jvu(validator, () => ({
      validate: () => false,
    }));

    expect(env.is(null, null)).toEqual(true);
  });
});