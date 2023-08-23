import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import PoppinsText from '../electrons/customFonts/PoppinsText';
import ButtonModal from '../atoms/buttons/ButtonModal';

const Win = (props) => {
    const title = props.title
  return <View style={styles.container}>
    <PoppinsText content={title}></PoppinsText>
    <ButtonModal style={{color:'white',fontSize:12}} content="CLick Here To Avial"></ButtonModal>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 230,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#FCC82B',
    backgroundColor: 'white',
    alignItems:"center",
    justifyContent:"center",
    padding:8
  },
});

export default Win;
