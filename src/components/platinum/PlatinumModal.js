import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { months } from 'moment/moment';
import PoppinsText from '../electrons/customFonts/PoppinsText';
import { ScrollView } from 'react-native';


// create a component
const PlatinumModal = ({ isVisible, onClose, getActiveMembershipData }) => {
    const arr = [{name:"Scan Value", value:"21-50", },{name:"Scan/ Month",value: "21"},{name:"Points Multiplier %",value: "2"},{name:"Gift Discount %", value:"10"},{name:"Cashback Option", value:"Yes"}];

    const ItemList = ({ items }) => {
        return (
          <FlatList
            data={arr}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <ScrollView style={styles.listContainer}>
                <View style={styles.flexRow}>
                <PoppinsTextMedium
                  style={{ color: '#000000', fontSize:18, fontWeight:'700' }}
                  content={item.name}></PoppinsTextMedium>
                    
                    <PoppinsTextMedium
                  style={{ color: item.value=="Yes"? "#268F07" : '#000000', fontSize:18, fontWeight:'600' }}
                  content={item.value}></PoppinsTextMedium>
                 
                </View>
                <View style={{borderWidth:0.3, borderColor:"#808080", marginTop:20, }}></View>
              
              </ScrollView>
            )}  
          />
        );
      };


    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={styles.modalTop}>
                        <LinearGradient colors={["#6b0ce4", "#9B56FE"]} style={{ height: '100%', width: '100%', borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
                            <View style={{ alignItems: 'center', marginTop: 30 }}>
                                <PoppinsTextMedium style={{ fontSize: 22, fontWeight: '600', color: '#ffffff', fontWeight: 'bold', marginBottom: 20 }} content={"Platinum"}></PoppinsTextMedium>

                                <View style={styles.circle}>
                                    <View style={{alignItems:'center'}}>
                                    <Image
                                        style={{ height: 100, width: 100, resizeMode: 'contain', marginTop:25 }}
                                        source={require('../../../assets/images/platinum.png')}></Image>
                                    </View>
                                 
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={{marginTop:60, borderColor:"#808080"}}>
                    <ItemList items={arr} />
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={20} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


// define your styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '90%',
        height: 610,
        borderRadius: 10,
        padding: 20,
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#0004ec',
        borderRadius: 10,
        position: 'absolute',
        top: -10,
        right: -10,
    },

    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalTop: {
        height: 161,
        width: '100%',
    },
    circle: {
        backgroundColor: "#ffffff",
        height: 147,
        width: 147,
        borderRadius: 90
    },
    listContainer:{
        marginTop:20,
    },
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10
    }
});


//make this component available to the app
export default PlatinumModal;
