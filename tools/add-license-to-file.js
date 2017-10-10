const fs = require('fs');
const package = require('./../package.json');
const buildDate = new Date();
const dist = require('minimist')(process.argv).dist;
const license = require('minimist')(process.argv).license;

function addLicenseToFile (license, destination) {
  if (!license) {
    throw new Error('license path is required as 1st argument');
  }

  addLicenseTextToFile(fs.readFileSync(license).toString(), destination);
}

function addLicenseTextToFile(licenseText, destination) {
  if (!destination) {
    throw new Error('destination file path is required as 2nd argument');
  }

  fs.writeFileSync(destination, `/*!
  Assimilate JSON Schema Validation Instrument
  @name assimilate
  @version ${package.version}
  @date ${buildDate.toUTCString()}
  @link https://github.com/json-schema-form/assimilate
  
  @license
  ${licenseText}

  Copyright (c) 2017-${buildDate.getFullYear()} JSON Schema Form
 **/
${fs.readFileSync(`${destination}`).toString()}
`);
}

module.exports = {
  addLicenseToFile: addLicenseToFile,
  addLicenseTextToFile: addLicenseTextToFile
};