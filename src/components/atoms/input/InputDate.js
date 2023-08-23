import React,{useState} from 'react';
import {View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker'
import DateIcon from 'react-native-vector-icons/MaterialIcons'
import PoppinsText from '../../electrons/customFonts/PoppinsText';

const InputDate = (props) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const data =props.data
    return (
        <TouchableOpacity onPress={()=>{
            setOpen(true)
        }} style={{height:54,width:200,backgroundColor:'#0000000D',borderRadius:2,borderColor:'#DDDDDD',alignItems:'center',justifyContent:"center",flexDirection:'row'}}>
            <PoppinsText content={data}></PoppinsText>
            <DateIcon name="date-range" color="#DDDDDD" size={30}></DateIcon>
            <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default InputDate;
