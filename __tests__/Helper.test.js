import {
  exchangeMap,
  getCurrencySymbol,
  provideCurrencyText,
} from '../common/helper';
import {data} from '../common/helper';

describe('Test helper methods', () => {
  it('test data value', () => {
    expect(data[0]).toBe('GBP');
    expect(data[1]).toBe('NZD');
    expect(data[2]).toBe('AUD');
    expect(data[3]).toBe('USD');
    expect(data[4]).toBe('JPY');
  });
  it('test exchange map value', () => {
    expect(exchangeMap.get(data[0])).toBe(0.011);
    expect(exchangeMap.get(data[1])).toBe(0.02);
    expect(exchangeMap.get(data[2])).toBe(0.018);
    expect(exchangeMap.get(data[3])).toBe(1.91);
    expect(exchangeMap.get(data[4])).toBe(0.012);
  });
  it('test provideCurrencyText', () => {
    expect(provideCurrencyText(data[0])).toBe('UK Pound');
    expect(provideCurrencyText(data[1])).toBe('NZ Dollar');
    expect(provideCurrencyText(data[2])).toBe('Australlian Dollar');
    expect(provideCurrencyText(data[3])).toBe('Japaneese');
    expect(provideCurrencyText(data[4])).toBe('US Dollar');
    expect(provideCurrencyText('INR')).toBe('Indian Ruppees');
  });
  it('test getCurrencySymbol', () => {
    expect(getCurrencySymbol(data[0])).toBe('\u00A3');
    expect(getCurrencySymbol(data[1])).toBe('NZ\u0024');
    expect(getCurrencySymbol(data[2])).toBe('A\u0024');
    expect(getCurrencySymbol(data[3])).toBe('\u00A5');
    expect(getCurrencySymbol(data[4])).toBe('\u0024');
    expect(getCurrencySymbol('INR')).toBe('\u20A8');
  });
});
