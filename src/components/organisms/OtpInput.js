import React, {useState,useEffect} from 'react';
import {SafeAreaView, Text, View,StyleSheet} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';



const CELL_COUNT = 4;

const OtpInput = (propData) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    return () => {
      if (value.length === 4) {
        propData.getOtpFromComponent(value);
      }
    };
  }, [value, propData]);
  if(
    value.length===4
  )
  {
    // console.log(value)
    propData.getOtpFromComponent(value)
  }
  return (
    <SafeAreaView style={styles.root}>
      
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles =  StyleSheet.create({
    root: {padding: 4, height: 80},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      marginTop: 10,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
    },
    cellText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
    },
    focusCell: {
      borderBlockColor:'white',
      borderBottomWidth: 2,
    },
  });

export default OtpInput;