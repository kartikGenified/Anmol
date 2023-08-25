import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { useSelector } from 'react-redux';
const ErrorModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  useEffect(()=>{
    if(props.openModal===true)
    {
        setModalVisible(true)
    }
    else{
        setModalVisible(false)
    }
  },[])
  const closeModal=()=>{
    setModalVisible(!modalVisible)
    props.modalClose()
  }
   


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            props.modalClose()
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.message}</Text>
            <Pressable
              style={{...styles.button,backgroundColor:ternaryThemeColor}}
              onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalView: {
   
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ErrorModal;