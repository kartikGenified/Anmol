import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useUploadImagesMutation } from '../../../apiServices/imageApi/imageApi';

const ImageInputWithUpload = (props) => {
    const [image, setImage] = useState(null)
    const data = props.data
    const action = props.action
    // const [
    //     uploadImageFunc,
    //     {
    //         data: uploadImageData,
    //         error: uploadImageError,
    //         isLoading: uploadImageIsLoading,
    //         isError: uploadImageIsError,
    //     },
    // ] = useUploadImagesMutation();

    // useEffect(() => {
    //     if (uploadImageData) {
    //         console.log("uploadImageData", uploadImageData)

    //     }
    //     else if (uploadImageError) {
    //         console.log("uploadImageError", uploadImageError)
    //     }
    // }, [uploadImageData, uploadImageError])

    // Memoize the handleOpenImageGallery function to prevent re-renders
    const handleOpenImageGallery = async () => {
        const result = await launchImageLibrary();
        console.log(result);
        console.log("result", result.assets[0].uri);
        setImage(result.assets[0].uri);
        const imageData = {
            uri: result.assets[0].uri,
            name: result.assets[0].uri.slice(0, 10),
            type: 'jpg/png',
        };
        console.log("image Data", result.assets[0])
        props.handleData(imageData);
    }

    // Memoize the image state to prevent re-renders
    console.log("imgimg", image)





    return (
        <TouchableOpacity onPress={() => {
            handleOpenImageGallery()
        }} style={{ width: '100%', alignItems: "center", justifyContent: "center", backgroundColor: '#EBF3FA', paddingVertical: 10, borderWidth: 1, borderColor: '#85BFF1', borderStyle: 'dotted' }}>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ height: 33, width: 35, }} source={require('../../../../assets/images/uploadIcon.png')} />
            </View>


            <View style={{ width: '86%', borderColor: '#DDDDDD', marginTop: 10, height: 20 }}>

                <PoppinsTextMedium style={{ color: 'black', alignSelf: 'center', }} content={"Upload the product Image"}></PoppinsTextMedium>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default ImageInputWithUpload;