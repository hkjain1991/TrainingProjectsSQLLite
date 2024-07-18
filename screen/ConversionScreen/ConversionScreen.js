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

const ConversionScreen = ({route}) => {
  const [currency, setCurrency] = useState(Base_Currency);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState();
  const [btnDisabled, setBthDisabled] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const input = useRef(null);
  const dataDropdown = [Base_Currency, ...data];
  let autoConvert = useRef(false);

  const loadData = useCallback(async () => {
    try {
      const db = await getDbOpenConnection();
      await createTable(db);
    } catch (error) {
      console.log(`In load data error: ${error}`);
    }
  }, []);

  useEffect(() => {
    // We want to run once when we come first time on screen to create table
    loadData();
  }, []);

  useEffect(() => {
    if (
      route?.params?.amount !== undefined &&
      route?.params?.currency !== undefined
    ) {
      setCurrency(route?.params?.currency);
      setSelectedIndex(dataDropdown.indexOf(route?.params?.currency));
      setAmount(route?.params?.amount);
      setBthDisabled(false);
      autoConvert.current = true;
    }
  }, [route?.params?.currency, route?.params?.amount]);

  useEffect(() => {
    if (autoConvert.current) {
      if (amount !== '') {
        convertAmount();
      } else {
        setResult([]);
      }
    } else {
      setResult([]);
    }
    autoConvert.current = false;
  }, [amount, currency]);

  /**
   * Converts the amount to different currencies and updates result state
   */
  function convertAmount() {
    input.current.blur();
    setLoadingVisible(true);

    /**
     * As we are saving exchange currency for India only so We have 2 different calculation for INR & others
     * 1. If User selected 'INR' -> result = entered amount * exchange rate
     * 2. If User selected other currency -> here We have 2 cases:
     *     a. If got other currency other than itself in the exchange data -> result = (entered amount * exchange rate)/ (exchange amount for selected currency)
     *     b. If got same currency in the exchange data -> result = (entered amount) / (exchange amount for selected currency)
     */
    try {
      let arr = [];
      if (currency === Base_Currency) {
        for (let [key, value] of exchangeMap) {
          let inArr = [];
          inArr[0] = key;
          inArr[1] = (amount * value).toFixed(2);
          arr.push(inArr);
        }
      } else {
        for (let [key, value] of exchangeMap) {
          let inArr = [];
          let currValue;
          // Base Currency Case -> If we got same in the exchange map mean We need to convert currency to INR
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
      if (!autoConvert.current) {
        saveDataInDb();
      }

      setResult(arr);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVisible(false);
    }
  }

  /**
   * Save converted value in db
   */
  const saveDataInDb = async () => {
    const db = await getDbOpenConnection();
    await insertDataIntoTable(db, currency, amount);
  };

  /**
   * sets data into currency state entered in input
   * @param item each input data
   */
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
          value={amount.toString()}
          onChangeText={value => {
            setAmount(value);
            setBthDisabled(value.length === 0);
            if (!autoConvert.current) {
              setResult([]);
            }
          }}
          inputMode="numeric"
          style={style.CurrencyInput}
          cursorColor="black"
          placeholder={'Enter Amount'}
          placeholderTextColor="black"
        />
        <SelectCountryDropdown
          callback={setValueInCurrencyState}
          dropdownData={dataDropdown}
          selectedIndex={selectedIndex}
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
