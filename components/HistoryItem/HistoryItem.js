import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import style from './style';
import {getCurrencySymbol, getImagePath} from '../../common/helper';

const HistoryItem = ({currency, amount, navigation}) => {
  return (
    <Pressable
      style={style.mainViewContainer}
      onPress={() => {
        navigation.navigate('Conversion', {
          currency: currency,
          amount: amount,
        });
      }}>
      <Text style={style.currencyAmount}>
        {`${getCurrencySymbol(currency)} ${amount}`}
      </Text>
      <Image
        source={getImagePath(currency)}
        style={style.currencyImg}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default HistoryItem;
