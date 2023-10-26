//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';


// create a component
const RedeemedStatusModal = ({ isVisible, onClose }) => {
    return (
        <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
          <Text>Hi</Text>
        </View>
    </Modal>
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
export default RedeemedStatusModal;
