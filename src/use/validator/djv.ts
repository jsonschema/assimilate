import { Validation } from '../../Validator';
try {
  const djv = require('djv');
  Validation.addLibrary('djv', djv);
}
catch(e) {}
// declare var djv: any;
// Validation.add('djv', djv);
