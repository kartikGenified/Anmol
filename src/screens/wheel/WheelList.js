//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';


// create a component
const WheelList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Navigator */}
            <View
                style={{
                    height: 50,
                    width: '100%',
                    backgroundColor: 'transparent',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                <TouchableOpacity
                    style={{ height: 20, width: 20, position: 'absolute', left: 20, marginTop: 10 }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                        source={require('../../../assets/images/blackBack.png')}></Image>
                </TouchableOpacity>

                <PoppinsTextMedium style={{ fontSize: 20, color: '#ffffff', marginTop: 5, position: 'absolute', left: 60 }} content={"FeedBack"}></PoppinsTextMedium>


            </View>
            {/* navigator */}



        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default WheelList;
