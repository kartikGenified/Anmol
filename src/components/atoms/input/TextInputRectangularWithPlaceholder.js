import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';
import PoppinsTextLeftMedium from '../../electrons/customFonts/PoppinsTextLeftMedium';
const TextInputRectangularWithPlaceholder = (props) => {
    const [value, setValue] = useState(props.value)
    const [keyboardType, setKeyboardType] = useState('default')
    const [error, setError] = useState(false);
    // console.log("value", props)
    const placeHolder = props.placeHolder
    const maxLength = props.maxLength
    const required = props.required
    const specialChar = props.specialCharValidation

    useEffect(() => {
        setValue(props.value)
        props.handleData(props.value,props.title)
    }, [props.value])

    useEffect(() => {
        if (placeHolder === "Mobile No") {
            setKeyboardType('numeric')
        }
    }, [])

    const handleInput = (text, placeHolder) => {
        if (specialChar) {
            const nameRegex = /^[a-zA-Z\s-]+$/;
            if (nameRegex.test(text)) {
                setValue(text)
                props.handleData(text, props.title)
                setError(false)
            }
            else {
                setValue("")
                if (text != "") {
                    setError(true)
                }else{
                    setError(false)
                }
            }

        }
        else {
            setValue(text)
            props.handleData(text, props.title)
        }

    }
    const handleInputEnd = (text, placeHolder) => {
        //    console.log(text)
        props.handleData(text, props.title)
    }

    return (
        <>
            <View style={{ height: 60, width: '86%', borderColor: '#DDDDDD', alignItems: "center", justifyContent: "center", backgroundColor: 'white', margin: 10, borderWidth: 0.6 }}>
                <View style={{ alignItems: "center", justifyContent: 'center', backgroundColor: 'white', position: "absolute", top: -15, left: 16 }}>
                    <PoppinsTextMedium style={{ color: "#919191", padding: 4, fontSize: 18 }} content={placeHolder}></PoppinsTextMedium>
                </View>
                <TextInput editable={props.editable} keyboardType={keyboardType} maxLength={maxLength} onEndEditing={() => { handleInputEnd(value, placeHolder) }} style={{ height: 50, width: '100%', alignItems: "center", justifyContent: "flex-start", fontWeight: '500', marginLeft: 32, letterSpacing: 1, fontSize: 16, color: 'black' }} placeholderTextColor="#808080" onChangeText={(text) => { handleInput(text, placeHolder) }} value={value} placeholder={ placeHolder ? required ? `${placeHolder} *` : `${placeHolder}`:"No Data"}></TextInput>
            </View>
            {specialChar && error && <PoppinsTextLeftMedium content="Special Charaters are not allowed" style={{ color: 'red' }}></PoppinsTextLeftMedium>}
        </>

    );
}

const styles = StyleSheet.create({})

export default TextInputRectangularWithPlaceholder;