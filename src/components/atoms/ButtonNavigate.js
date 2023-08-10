import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PoppinsText from '../electrons/customFonts/PoppinsText';
import {useNavigation} from '@react-navigation/native';
const ButtonNavigate = props => {
  const navigation = useNavigation();

  const backgroundColor = props.backgroundColor;
  // prop to manipulate background color of button
  const style = props.style;
  // prop to manipulate text color of button
  const navigateTo = props.navigateTo;
  // prop to navigate to another page
  const content = props.content;
  // prop to display text inside the button
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('buttonpressed');
        navigation.navigate(navigateTo)
      }}
      style={{
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <PoppinsText style={style} content={content}></PoppinsText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonNavigate;
