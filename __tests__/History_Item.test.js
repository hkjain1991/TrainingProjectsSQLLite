import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HistoryItem from '../components/HistoryItem/HistoryItem';

describe('check for text should be as amount and symbol', () => {
  it('displays the amount and symbol', () => {
    render(<HistoryItem amount={1} currency={'INR'} />);
    expect(screen.getByText('\u20A8 1')).toBeVisible();
  });
});
