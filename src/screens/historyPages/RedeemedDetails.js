import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import StatusBox from '../../components/atoms/StatusBox';
import moment from 'moment';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import { useSelector } from 'react-redux';
import Location from 'react-native-vector-icons/EvilIcons';
import Message from 'react-native-vector-icons/Feather';
import Edit from 'react-native-vector-icons/Entypo';
import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';
import { BaseUrlImages } from '../../utils/BaseUrlImages';
import RedeemedStatusModal from '../../components/reedemDetails/ReedemStatusModal';

import ModalWithBorder from '../../components/modals/ModalWithBorder';
import Icon from 'react-native-vector-icons/Feather';
import ButtonOval from '../../components/atoms/buttons/ButtonOval';


const RedeemedDetails = ({ navigation, route }) => {
    const height = Dimensions.get('window').height
    const data = route.params.data
    const redeemedDate = moment(data.created_at).format("DD MMM YYYY")
    const redeemedId = data.ref_no
    const redemptionMode = data.redemption

    const [modalStatus, setModalStatus] = useState(false)
    //modal
    const [openModalWithBorder, setModalWithBorder] = useState(false)
    const [message, setMessage] = useState('')

    console.log("Data RedeemedDetails", data)
    const secondaryThemeColor = useSelector(
        state => state.apptheme.secondaryThemeColor,
    )
        ? useSelector(state => state.apptheme.secondaryThemeColor)
        : '#FFB533';
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
    )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    const productName = data.gift.gift[0].name
    const productImage = require('../../../assets/images/box.png')
    const walletPoints = data.points
    const expectedDeliveryDate = "23 Sep 2023"
    const deliveryStatus = "Approved"
    const image = data.gift.gift[0].images[0]
    const deliveryAddress = "69/5, Gali no -2 Sainik Enclave Sector 2, Mohan Garden,Uttam Nagar, New Delhi - 110059"



    const showSuccessModal = () => {
        setModalWithBorder(true)
    };

    const hideSuccessModal = () => {
        setModalStatus(false);
    };

    //function to handle Modal
    const modalClose = () => {
        setModalWithBorder(false);
    };
    
    const ModalContentWithReciept = () => {
        return (
            <View>
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                    <Icon name="check-circle" size={53} color={"#91B406"} />
                    <PoppinsTextMedium style={{ fontSize: 27, fontWeight: '600', color: "#91B406", marginLeft: 5, marginTop: 5 }} content={"Success ! !"}></PoppinsTextMedium>

                    <View style={{ marginTop: 10, marginBottom: 40 }}>
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, }} content={"Your request has been submitted & warranty activated successfully."}></PoppinsTextMedium>
                    </View>
                </View>

                <View style={{ backgroundColor: "#F4F4F4", borderColor: '#DDDDDD', borderWidth: 1, width: 270, height: 241, marginBottom: 20, marginHorizontal: 20, }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '800', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Transaction No: "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '800', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"T0002"}></PoppinsTextMedium>
                    </View>

                    {/* <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Date & TIme : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"21 June 2023 5:27PM"}></PoppinsTextMedium>
                    </View> */}

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Amount : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={data?.amount}></PoppinsTextMedium>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Beneficiary Name : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"T0002"}></PoppinsTextMedium>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Bank Name : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"SBI"}></PoppinsTextMedium>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Account No : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"T0002"}></PoppinsTextMedium>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"IFSC Code : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#000000", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"T0002"}></PoppinsTextMedium>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#91B406", marginLeft: 10, marginTop: 5, marginBottom: 5 }} content={"Status : "}></PoppinsTextMedium>
                        <PoppinsTextMedium style={{ fontSize: 13, fontWeight: '600', color: "#91B406", marginLeft: 5, marginTop: 5, marginBottom: 5 }} content={"Done"}></PoppinsTextMedium>
                    </View>
                </View>


                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <ButtonOval handleOperation={modalClose} backgroundColor="#000000" content="OK" style={{ color: 'white', paddingVertical: 4 }} />
                </View>



            </View>
        )
    }



    const ClickToReport = () => {
        return (
            <View style={{ alignItems: "center", justifyContent: 'center', width: "100%", position: "absolute", bottom: 10 }}>
                <PoppinsTextMedium style={{ color: 'black', fontSize: 16, fontWeight: '700' }} content="Issue with this ?"></PoppinsTextMedium>
                <TouchableOpacity onPress={() => { navigation.navigate("ReportAndIssue", { data: data }) }} style={{ height: 50, width: 180, backgroundColor: "#D10000", alignItems: "center", justifyContent: "center", borderRadius: 4, marginTop: 6 }}>
                    <PoppinsTextMedium style={{ color: 'white', fontSize: 16 }} content="Click here to report"></PoppinsTextMedium>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ alignItems: "center", justifyContent: "flex-start", height: '100%', backgroundColor: "white", width: "100%" }}>
            <View style={{ alignItems: "center", justifyContent: "flex-start", flexDirection: "row", width: '100%', marginTop: 10, height: 40, marginLeft: 20 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={{ height: 24, width: 24, resizeMode: 'contain', marginLeft: 10 }} source={require('../../../assets/images/blackBack.png')}></Image>

                </TouchableOpacity>
                <PoppinsTextMedium content="Redeemed Details" style={{ marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#171717' }}></PoppinsTextMedium>
                <TouchableOpacity style={{ marginLeft: 160 }}>
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={require('../../../assets/images/notificationOn.png')}></Image>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ width: '100%', height: '100%' }}>
                <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ alignItems: "center", justifyContent: "center", marginTop: 30, marginBottom: 10 }}>
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '600', color: '#171717' }} content={`Redeem Date ${redeemedDate}`}></PoppinsTextMedium>
                        <View style={{ alignItems: "center", justifyContent: "center", borderWidth: 1, borderStyle: 'dashed', backgroundColor: secondaryThemeColor, padding: 6, marginTop: 8, marginBottom: 10 }}>
                            <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '600', color: '#171717' }} content={`Redeem Id:  ${redeemedId}`}></PoppinsTextMedium>
                        </View>
                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: '#DDDDDD', width: '100%', padding: 10 }}>
                        <Image style={{ height: 80, width: 80, resizeMode: "contain" }} source={{ uri: BaseUrlImages + image }}></Image>
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '700', color: '#171717' }} content={productName}></PoppinsTextMedium>
                    </View>

                    {/* grey box ------------------------------- */}
                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#F7F7F7", width: '100%', padding: 10 }}>
                        <PoppinsTextMedium style={{ fontSize: 20, fontWeight: '600', color: '#171717' }} content={`Redeemption Mode: ${redemptionMode}`}></PoppinsTextMedium>

                        {data.redemption_type !== "1" && <View style={{ height: 50, width: 140, borderWidth: 1, borderStyle: 'dashed', backgroundColor: secondaryThemeColor, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 6, flexDirection: "row" }}>
                            <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={require('../../../assets/images/points.png')}></Image>
                            <PoppinsTextMedium style={{ fontSize: 24, fontWeight: '700', color: '#171717' }} content={walletPoints}></PoppinsTextMedium>
                        </View>}
                        <PoppinsTextMedium style={{ fontSize: 16, fontWeight: '500', color: '#171717', marginTop: 10 }} content={`Expected Delivery Date : ${expectedDeliveryDate}`}></PoppinsTextMedium>
                        <View style={{ height: 50, padding: 4, borderWidth: 1, borderStyle: 'dashed', backgroundColor: secondaryThemeColor, alignItems: "center", justifyContent: "center", marginTop: 10, borderRadius: 6, flexDirection: "row" }}>
                            <Image style={{ height: 40, width: 40, resizeMode: "contain" }} source={require('../../../assets/images/greenTick.png')}></Image>
                            <PoppinsTextMedium style={{ fontSize: 19, fontWeight: '700', color: '#171717', marginLeft: 10 }} content={`Delivery Status : ${deliveryStatus}`}></PoppinsTextMedium>
                        </View>
                    </View>
                    {/* buttons */}
                    {/* -------------------------------------------------- */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', marginTop: 20 }}>
                        <TouchableOpacity onPress={showSuccessModal} style={{ height: 40, padding: 8, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: '#FB774F', borderRadius: 4, width: '48%', marginLeft: 5 }}>
                            <Location name="location" size={30} color='white' />
                            <PoppinsTextMedium style={{ color: 'white', fontSize: 14, marginLeft: 4 }} content="Track Delivery Status "></PoppinsTextMedium>
                        </TouchableOpacity>
                        <View style={{ height: 40, padding: 8, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: 'black', borderRadius: 4, width: '46%', marginLeft: 14 }}>
                            <Message name="message-square" size={24} color='white' />
                            <PoppinsTextMedium style={{ color: 'white', fontSize: 14, marginLeft: 10 }} content="Share Feedback "></PoppinsTextMedium>
                        </View>
                    </View>
                    {/* Delivery Address */}
                    {/* -------------------------------------------------------------- */}
                    {/* <View style={{width:'90%',borderTopWidth:1,borderStyle:'dashed',borderColor:'#DDDDDD',alignItems:"center",justifyContent:"flex-start",marginTop:20}}>
                <PoppinsText style={{color:"black",fontSize:20}} content="Delivery Address"></PoppinsText>
                <PoppinsTextMedium style={{color:'black',fontSize:18,width:'80%',textAlign:'center'}} content={deliveryAddress}></PoppinsTextMedium>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:4}}>
                <PoppinsTextMedium style={{color:ternaryThemeColor,fontSize:18,fontWeight:'700'}} content = "Change Delivery Address? "></PoppinsTextMedium>
                <View style={{height:30,width:30,borderRadius:15,alignItems:"center",justifyContent:"center",borderColor:ternaryThemeColor,borderWidth:1}}>
                <Edit style={{}} name="edit" size={16} color={ternaryThemeColor}></Edit>
                </View>
            </View>
            </View> */}

                    {/* click to report ------------------------------------------------------- */}
                    {/* <ClickToReport></ClickToReport> */}

                    <View style={{ marginHorizontal: 100 }}>
          {openModalWithBorder && <ModalWithBorder
            modalClose={modalClose}
            message={message}
            openModal={openModalWithBorder}
            comp={ModalContentWithReciept}></ModalWithBorder>}
        </View>

                    <RedeemedStatusModal isVisible={modalStatus} user={"Amit"} onClose={hideSuccessModal} />

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RedeemedDetails;
