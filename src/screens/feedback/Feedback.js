import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import FeedbackTextArea from '../../components/feedback/FeedbackTextArea';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import ButtonWithPlane from '../../components/atoms/buttons/ButtonWithPlane';
import StarRating from 'react-native-star-rating';
import FeedbackModal from '../../components/feedback/FeedbackModal';


const Feedback = ({ navigation }) => {

    //states
    const [starCount, setStarCount] = useState(0);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
    const [feedback, setFeedback] = useState("")


    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
    )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';


    const onStarRatingPress = (rating) => {
        setStarCount(rating);
    };

    const showSuccessModal = () => {
        if(feedback!=""){
            setIsSuccessModalVisible(true); 
        }
        
    };

    const hideSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    const handleFeedbackChange = (text) => {
        // console.log(feedback)
        setFeedback(text);
      };

    return (
        <View style={[styles.container, { backgroundColor: ternaryThemeColor }]}>


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

         
            <View style={{ backgroundColor: '#ffffff', flex: 1, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                <View style={styles.marginTopTen}>
                    <Image
                        style={styles.feedbackImage}
                        source={require('../../../assets/images/feed_back.png')}
                    />
                </View>

                <View>
                    <View style={{ alignItems: 'center' }}>
                        <View>
                            <PoppinsTextMedium style={{ marginRight: 10, fontSize: 16, color: '#58585a', marginLeft: 30, marginTop: 20 }} content={"Please Rate"}></PoppinsTextMedium>
                        </View>

                        <View style={styles.StarRating}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={starCount}
                                selectedStar={(rating) => onStarRatingPress(rating)}
                                fullStarColor={'gold'}
                                starSize={40}
                            />
                        </View>
                        <View>
                            <PoppinsTextMedium style={{ marginRight: 10, fontSize: 16, color: '#58585a', marginLeft: 30 }} content={"Comment/ Suggestions?"}></PoppinsTextMedium>
                        </View>
                    </View>
                </View>

                <KeyboardAvoidingView
                    style={[styles.FeedbackStars]}
                    behavior="position"
                    enabled
                >

                    <View>
                        <FeedbackTextArea  onFeedbackChange={handleFeedbackChange}/>
                        <View style={{ marginHorizontal: '20%' }}>
                            <ButtonWithPlane title="Submit" navigate="" parmas={{}} type={"feedback"} onModalPress = {showSuccessModal}></ButtonWithPlane>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </View>


            <FeedbackModal isVisible={isSuccessModalVisible} user={"Amit"} onClose={hideSuccessModal} />


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigator: {
        height: 50,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    navigatorIcon: {
        height: 20,
        width: 20,
        position: 'absolute',
        marginTop: 10,
    },
    navigatorImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    marginTopTen: {
        marginTop: '10%',
    },
    feedbackImage: {
        height: 206,
        width: '90%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    feedbackText: {
        color: '#58585a',
        fontSize: 15,
        fontWeight: '400',
    },
    StarRating: {
        marginTop: 10,
        marginBottom: 30
    },
    FeedbackStars: {},
});

export default Feedback;
