import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity,FlatList} from 'react-native';

const RectangularUnderlinedDropDown = (props) => {
    const [selectedBank, setSelectedBank] = useState('Select Bank')
    const [showList, setShowList] = useState(false)
    const [topMargin, setTopMargin] = useState(0)
    const data = props.data
    
    const handleSelect=(data)=>{
        // console.log(data)
        setSelectedBank(data)
        setShowList(false)
        props.handleData(data)
    }
    const handleOpenList=()=>{
        setShowList(!showList)
        setTopMargin(20)
    }
    const SelectableDropDownComponent=(props)=>{
        const title = props.title
        
        return(
            <TouchableOpacity onPress={()=>{
                handleSelect(title)
            }} style={{alignItems:"flex-start",justifyContent:"center",width:'90%',height:40,borderBottomWidth:1,borderColor:'#DDDDDD'}}>
                <Text style={{color:'black',fontSize:14}}>{title}</Text>                
            </TouchableOpacity>
        )
    }
    return (
        <View style={{backgroundColor:"white",width:'90%',borderBottomWidth:1,borderColor:'#DDDDDD',alignItems:"center",justifyContent:'center',marginTop:topMargin}}>
            <TouchableOpacity onPress={()=>{handleOpenList()}} style={{flexDirection:"row",width:'100%',alignItems:"center",justifyContent:'center',height:40,borderBottomWidth:1,borderColor:'#DDDDDD'}}>
                <Text style={{color:'black',fontSize:16,position:"absolute",left:20,top:10,fontWeight:"600"}}>{selectedBank}</Text>
                <Image style={{height:14,width:14,resizeMode:"contain",position:"absolute",right:10,top:10}} source={require('../../../../assets/images/arrowDown.png')}></Image>
            </TouchableOpacity>
            {
                showList && data.map((item,index)=>{
                    // console.log(item)
                    return(
                        <SelectableDropDownComponent key ={index} title={item}></SelectableDropDownComponent>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({})

export default RectangularUnderlinedDropDown;
