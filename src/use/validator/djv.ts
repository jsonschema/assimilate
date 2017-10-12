import { Assimilate, Validator } from '../../Validator';
try {
  const djv = require('djv');
  Validator.addLibrary('djv', Assimilate(djv));
} catch (e) { }
