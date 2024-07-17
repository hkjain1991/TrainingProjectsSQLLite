import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  CurrencyInputRow: {
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 20,
    marginVertical: 20,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  MainViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  CurrencyInput: {flex: 1, color: 'black', paddingHorizontal: 5},
  convertBtn: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },
  convertOpacity: {
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 5,
    marginHorizontal: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  convertImgOpacity: {opacity: 0.5},
  currencySymbolText: {color: 'green', marginStart: 10},
  ActivityIndicator: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  dropdownRenderItemBackgroundColor: {backgroundColor: '#D2D9DF'},
});

export default style;
