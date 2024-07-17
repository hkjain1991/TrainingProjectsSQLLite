import React from 'react';
import {Text, View} from 'react-native';
import style from './style';
import {getCurrencySymbol, provideCurrencyText} from '../../common/helper';

const CurrencyItem = ({currency, amount}) => {
  return (
    <View style={style.mainViewContainer}>
      <Text style={style.currencyText}>{provideCurrencyText(currency)}</Text>
      <Text style={style.currencyAmount}>
        {`${getCurrencySymbol(currency)} ${amount}`}
      </Text>
    </View>
  );
};

export default CurrencyItem;
