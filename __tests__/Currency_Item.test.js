import React from 'react';
import CurrencyItem from '../components/CurrencyItem/CurrencyItem';
import {render, screen} from '@testing-library/react-native';

describe('check for text should be as amount and symbol', () => {
  it('displays the amount and symbol', () => {
    render(<CurrencyItem amount={1} currency={'INR'} />);
    expect(screen.getByText('\u20A8 1')).toBeVisible();
    expect(screen.getByText('Indian Ruppees')).toBeVisible();
  });
});
