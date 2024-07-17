export const Base_Currency = 'INR';

export const data = ['GBP', 'NZD', 'AUD', 'USD', 'JPY'];

export const exchangeMap = new Map([
  [data[0], 0.011],
  [data[1], 0.02],
  [data[2], 0.018],
  [data[3], 1.91],
  [data[4], 0.012],
]);

export const getImagePath = (currency = Base_Currency) => {
  switch (currency) {
    case data[0]:
      return require('../assets/images/united_kingdom.png');
    case data[1]:
      return require('../assets/images/new_zealand.png');
    case data[2]:
      return require('../assets/images/australia.png');
    case data[3]:
      return require('../assets/images/japan.png');
    case data[4]:
      return require('../assets/images/united_states.png');
    default:
      return require('../assets/images/india.png');
  }
};

export const getCurrencySymbol = (currency = Base_Currency) => {
  switch (currency) {
    case data[0]:
      return '\u00A3';
    case data[1]:
      return 'NZ\u0024';
    case data[2]:
      return 'A\u0024';
    case data[3]:
      return '\u00A5';
    case data[4]:
      return '\u0024';
    default:
      return '\u20A8';
  }
};

export const provideCurrencyText = (currency = Base_Currency) => {
  switch (currency) {
    case data[0]:
      return 'UK Pound';
    case data[1]:
      return 'NZ Dollar';
    case data[2]:
      return 'Australlian Dollar';
    case data[3]:
      return 'Japaneese';
    case data[4]:
      return 'US Dollar';
    default:
      return 'Indian Ruppees';
  }
};
