import { expect } from 'chai';

// tslint:disable-next-line:no-var-requires
// const Calculator = require("../../../Calculator"); // we cannot report a code covarage report because the file is outside root dir
// tslint:disable-next-line:no-var-requires
const Calculator = require('./example'); // we can report a code coverage report

const cal = new Calculator();

describe('calculate', () => {
  it('add', () => {
    const result = cal.Sum(5, 2);
    expect(result).equal(7);
  });

  it('substract', () => {
    const result = cal.Difference(5, 2);
    expect(result).equal(3);
  });
});
