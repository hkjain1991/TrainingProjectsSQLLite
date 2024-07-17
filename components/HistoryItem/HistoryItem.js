import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './style';
import {getCurrencySymbol, getImagePath} from '../../common/helper';

const HistoryItem = ({currency, amount}) => {
  return (
    <View style={style.mainViewContainer}>
      <Text style={style.currencyAmount}>
        {`${getCurrencySymbol(currency)} ${amount}`}
      </Text>
      <Image
        source={getImagePath(currency)}
        style={style.currencyImg}
        resizeMode="contain"
      />
    </View>
  );
};

export default HistoryItem;
