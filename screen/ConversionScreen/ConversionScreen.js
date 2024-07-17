import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import CurrencyItem from '../../components/CurrencyItem/CurrencyItem';
import {
  Base_Currency,
  data,
  exchangeMap,
  getCurrencySymbol,
} from '../../common/helper';
import {
  createTable,
  getDbOpenConnection,
  insertDataIntoTable,
} from '../../database/sqllite/DbService';
import SelectCountryDropdown from '../SelectCountryDropdown/SelectCountryDropdown';

const ConversionScreen = () => {
  const [currency, setCurrency] = useState(Base_Currency);
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();
  const [btnDisabled, setBthDisabled] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const input = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const db = await getDbOpenConnection();
      await createTable(db);
    } catch (error) {
      console.log(`In load data error: ${error}`);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function convertAmount() {
    input.current.blur();
    setLoadingVisible(true);
    try {
      let arr = [];
      if (currency === Base_Currency) {
        for (let [key, value] of exchangeMap) {
          console.log(value);
          let inArr = [];
          inArr[0] = key;
          inArr[1] = (amount * value).toFixed(2);
          arr.push(inArr);
        }
      } else {
        for (let [key, value] of exchangeMap) {
          let inArr = [];
          let currValue;
          // Base Currency Case
          if (key === currency) {
            currValue = amount / exchangeMap.get(currency);
            inArr[0] = Base_Currency;
          } else {
            currValue = (value * amount) / exchangeMap.get(currency);
            inArr[0] = key;
          }
          inArr[1] = currValue.toFixed(2);
          arr.push(inArr);
        }
      }
      saveDataInDb();
      setResult(arr);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVisible(false);
    }
  }

  const saveDataInDb = async () => {
    const db = await getDbOpenConnection();
    await insertDataIntoTable(db, currency, amount);
  };

  const setValueInCurrencyState = item => {
    setCurrency(item);
  };

  return (
    <SafeAreaView style={style.MainViewContainer}>
      <View style={style.CurrencyInputRow}>
        <Text style={style.currencySymbolText}>
          {getCurrencySymbol(currency)}
        </Text>
        <TextInput
          ref={input}
          value={amount}
          onChangeText={value => {
            setAmount(value);
            setBthDisabled(value.length === 0);
          }}
          inputMode="numeric"
          style={style.CurrencyInput}
          cursorColor="black"
          placeholder="Enter Amount"
          placeholderTextColor="black"
        />
        <SelectCountryDropdown
          callback={setValueInCurrencyState}
          dropdownData={[Base_Currency, ...data]}
        />
      </View>
      <TouchableOpacity
        disabled={btnDisabled}
        onPress={() => convertAmount()}
        style={[style.convertOpacity, btnDisabled && style.convertImgOpacity]}>
        <Text style={style.convertBtn}>Convert</Text>
      </TouchableOpacity>
      {!loadingVisible ? (
        <FlatList
          data={result}
          renderItem={({item}) => (
            <CurrencyItem currency={item[0]} amount={item[1]} />
          )}
        />
      ) : (
        <View style={style.ActivityIndicator}>
          <ActivityIndicator size="500" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConversionScreen;
