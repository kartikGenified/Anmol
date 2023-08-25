import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image,ScrollView,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import CongratulationActionBox from '../../components/atoms/CongratulationActionBox';
import Win from '../../components/molecules/Win';
import ButtonSquare from '../../components/atoms/buttons/ButtonSquare';

const CongratulateOnScan = ({navigation,route}) => {
    const buttonThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : '#ef6110';

    const height = Dimensions.get('window').height;
    const workflowProgram = route.params.workflowProgram

    const handleWorkflowNavigation=()=>{
        console.log("scccess")
    
        if(workflowProgram[0]==="Static Coupon")
        {
        
        navigation.navigate('CongratulateOnScan',{
          workflowProgram:workflowProgram.slice(1)
        })
        }
        else if (workflowProgram[0]==="Warranty")
        {
        navigation.navigate('ActivateWarranty',{
          workflowProgram:workflowProgram.slice(1)
        })
    
    
        }
        else if (workflowProgram[0]==="Points On Product")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
    else if (workflowProgram[0]==="Cashback")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
    else if (workflowProgram[0]==="Wheel")
    {
      console.log(workflowProgram.slice(1))
    navigation.navigate('CongratulateOnScan',{
      workflowProgram:workflowProgram.slice(1)
    })

    }
        else{
        navigation.navigate('Genuinity',{
          workflowProgram:workflowProgram.slice(1)
        })
    
    
    
        }
    
      }
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:buttonThemeColor}}>
            
            <View style={{height:'8%',flexDirection:"row",position:'absolute',top:0,width:'100%',alignItems:'center'}}>
            <TouchableOpacity
            style={{width:'20%',alignItems:"center",justifyContent:"center",height:"100%"}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain',position:"absolute",left:20}}
              source={require('../../../assets/images/blackBack.png')}></Image>
          </TouchableOpacity>
          <PoppinsTextMedium style={{color:'white',fontSize:18,right:10}} content = "Congratulations"></PoppinsTextMedium>
            </View>

            {/* main view */}
            
            <View style={{height:'92%',width:'100%',backgroundColor:"white",borderTopLeftRadius:40,borderTopRightRadius:40,position:"absolute",bottom:0,alignItems:"center",justifyContent:"center"}}>
            <ScrollView style={{width:'100%',height:'100%',marginTop:30}}>
            
            <View style={{width:'100%',height:height-100,alignItems:"center",justifyContent:'center',marginTop:10,backgroundColor:'white'}}>
                {/* actions pperformed container----------------------------------- */}
            <View style={{height:'50%',width:'90%',backgroundColor:"white",borderRadius:20,alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:'#DDDDDD',marginTop:50}}>
            <Image style={{height:70,width:70,resizeMode:'contain',margin:10}} source={require('../../../assets/images/gold.png')}></Image>
            <PoppinsTextMedium style={{color:'#7BC143',fontSize:24,fontWeight:'700'}} content="Congratulations"></PoppinsTextMedium>
            <PoppinsTextMedium style={{color:'#333333',fontSize:20,fontWeight:'500',width:'60%',marginTop:6}} content="You have successfully perform the action"></PoppinsTextMedium>
            {/* action box ---------------------------------------------- */}
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10}}>   
            <CongratulationActionBox title="Product Scanned" data="5" primaryColor={buttonThemeColor} secondaryColor={buttonThemeColor}></CongratulationActionBox>
            <CongratulationActionBox primaryColor={buttonThemeColor} secondaryColor={buttonThemeColor}></CongratulationActionBox>
            </View>
            {/* -------------------------------------------------------- */}

            </View>
            {/* -------------------------------------------------------- */}
            {/* rewards container---------------------------------------------- */}
            <View style={{height:'50%',width:'90%',backgroundColor:'#DDDDDD',borderRadius:4,marginTop:50,alignItems:"center",justifyContent:"center"}}>
                <View style={{height:48,width:160,backgroundColor:buttonThemeColor,borderWidth:1,borderStyle:'dotted',borderColor:'white',borderRadius:2,position:"absolute",top:-20,alignItems:"center",justifyContent:"center"}}>
                    <PoppinsTextMedium style={{fontSize:16,fontWeight:'800',color:"white"}} content="You Have Won"></PoppinsTextMedium>
                </View>
                <Win title="1 Zomato Coupon"></Win>
            </View>
            </View>
            </ScrollView>
            <View style={{width:'100%',height:80,backgroundColor:"white"}}>
                <View style={{alignItems:"center",justifyContent:"center",width:"100%"}}>
                    <PoppinsTextMedium style={{fontWeight:"800",fontSize:18}} content="View Scanned List"></PoppinsTextMedium>
                   
                </View>
                <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
                    <ButtonSquare style={{color:'white'}} content="Cancel"></ButtonSquare>
                    <ButtonSquare handleOperation={handleWorkflowNavigation} style={{color:'white'}} content="Okay"></ButtonSquare>

                </View>
            </View>
            </View>
            

            
        </View>
    );
}

const styles = StyleSheet.create({})

export default CongratulateOnScan;
