import React,{useState,useEffect} from 'react';
import {View, StyleSheet,TextInput,Modal,Pressable,Text,Image} from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';
import { useVerifyPanMutation } from '../../../apiServices/verification/PanVerificationApi';
const TextInputPan = (props) => {
    const [value,setValue] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const placeHolder = props.placeHolder

    const [verifyPanFunc,{
        data:verifyPanData,
        error:verifyPanError,
        isLoading:verifyPanIsLoading,
        isError:verifyPanIsError
      }]= useVerifyPanMutation()

    console.log("Aadhar TextInput")

    useEffect(()=>{
       if(value)
       {
        if(value.length===10)
        {
  
        //   const data = {
        //     "name":name,
        //   "pan":pan
        // }
        
        const data={
          "name":"Test2",
          "pan":"AMJCL2021N"
          }
        verifyPanFunc(data)
        console.log(value)
        setValue(value)
          
        }
       }
      },[value])
      useEffect(()=>{
        if(verifyPanData)
        {
        console.log("verifyPanData",verifyPanData)
        if(verifyPanData.success)
        {
        setModalVisible(true)
        }
        }
        else if(verifyPanError)
        {
        console.log("verifyPanError",verifyPanError)
        }
        },[verifyPanData,verifyPanError])
        
    const handleInput=(text)=>{
        setValue(text)
        // props.handleData(value)
       
    }
    
    const handleInputEnd=()=>{
        let tempJsonData ={...props.jsonData,"value":value}
        console.log(tempJsonData)
        props.handleData(tempJsonData)
    }

    return (
        <View style={{height:60,width:'86%',borderWidth:1,borderColor:'#DDDDDD',alignItems:"center",justifyContent:"center",backgroundColor:'white',margin:10}}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pan Verified Succesfully</Text>
            <Image style={{height:60,width:60,margin:20}} source={require('../../../../assets/images/greenTick.png')}></Image>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            <View style={{alignItems:"center",justifyContent:'center',backgroundColor:'white',position:"absolute",top:-15,left:16}}>
                <PoppinsTextMedium style={{color:"black",padding:4}} content = {placeHolder}></PoppinsTextMedium>
            </View>
            <TextInput maxLength={12} onSubmitEditing={(text)=>{handleInputEnd()}} onEndEditing={(text)=>{handleInputEnd()}} style={{height:50,width:'100%',alignItems:"center",justifyContent:"flex-start",fontWeight:'500',marginLeft:24}} placeholderTextColor="grey" onChangeText={(text)=>{handleInput(text)}} value={value} placeholder={`${placeHolder} *`}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
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
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize:16,
      color:'black',
      fontWeight:'600'
    },
  });

export default TextInputPan;
