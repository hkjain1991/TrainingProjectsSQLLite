import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import style from './style';
import {getImagePath} from '../../common/helper';
import {View, Image} from 'react-native';

const SelectCountryDropdown = ({dropdownData, callback}) => {
  return (
    <SelectDropdown
      data={dropdownData}
      onSelect={(selectedItem, index) => {
        callback(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={style.dropdownButtonStyle}>
            <Image
              source={getImagePath(selectedItem)}
              style={style.currencyImg}
              resizeMode="contain"
            />
            <Image
              source={
                isOpened
                  ? require('../../assets/images/arrow_down.png')
                  : require('../../assets/images/arrow_up.png')
              }
              style={style.chevromImg}
              resizeMode="contain"
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              style.dropdownItemStyle,
              isSelected && style.dropdownRenderItemBackgroundColor,
            ]}>
            <Image
              source={getImagePath(item)}
              style={style.currencyItemImg}
              resizeMode="contain"
            />
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={style.dropdownMenuStyle}
      defaultValueByIndex={0}
    />
  );
};

export default SelectCountryDropdown;
