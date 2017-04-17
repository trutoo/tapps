import { Injectable } from '@angular/core';

export enum UNIT {
  CURRENCY,
  DISTANCE,
  TIME,
}

export enum CURRENCY {
  USD,
  HKD,
  EURO,
  GBP,
  SEK,
}

const OPERATORS = [
  { test: /\+/, },
  { test: /\-/, },
  { test: /\*/, },
  { test: /\//, },
  { test: /in/, },
  { test: /of/, },
];
const UNITS = [
  { test: /^(\$)\d+($| ?USD$)/i, unit: UNIT.CURRENCY, currency: CURRENCY.USD },
  { test: /^(\$)\d+ ?HKD$/i, unit: UNIT.CURRENCY, currency: CURRENCY.HKD },
  { test: /^\€/, unit: UNIT.CURRENCY, },
  { test: /^\£/, unit: UNIT.CURRENCY, },
  { test: / ?kr$/, unit: UNIT.CURRENCY, },
  { test: / ?SEK$/i, unit: UNIT.CURRENCY, },
  { test: / ?cm$/, unit: UNIT.DISTANCE, },
  { test: / ?m$/, unit: UNIT.DISTANCE, },
];

@Injectable()
export class FormatterService {

  constructor() { }

  format(content: string): string {
    let words = content.split(' ');
    words = words.map((word: string, index: number) => {
      word = this.testOperator(word);
      word = this.testUnit(word);
      return word;
    });
    return words.join(' ');
  }

  private testOperator(word: string): string {
    for (let i = 0; i < OPERATORS.length; i++) {
      if (OPERATORS[i].test.test(word)) {
        return `<i class="operator">${word}</i>`;
      }
    }
    return word;
  }

  private testUnit(word: string): string {
    for (let i = 0; i < UNITS.length; i++) {
      if (UNITS[i].test.test(word)) {
        console.log(UNITS[i]['currency']);
        return `<i class="unit">${word}</i>`;
      }
    }
    return word;
  }
}
