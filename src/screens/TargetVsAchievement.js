//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacityl, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PoppinsTextMedium from '../components/electrons/customFonts/PoppinsTextMedium';
import InputDateProfile from '../components/atoms/input/InputDateProfile';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import { useTargetVsAchievementMutation } from '../apiServices/targetachievement/targetAchievement';
import * as Keychain from 'react-native-keychain';
import DataNotFound from './data not found/DataNotFound';


// create a component
const TargetVsAchievement = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("");
    const [month, setMonth] = useState(null)
    const [year, setYeat] = useState(null)

    const[data, setData]= useState(null)
    

    const [
        TargetVsAchievementFunc,
        {
            data: TargetVsAchievementData,
            error: TargetVsAchievementError,
            isLoading: TargetVsAchievementisLoading,
            isError: TargetVsAchievementisError,
        },
    ] = useTargetVsAchievementMutation();

    const userData = useSelector(state => state.appusersdata.userData);

    


    const showPicker = useCallback((value) => setShow(value), []);
    let demoArray = [
        {
            target: "5000",
            achievement: "4000"
        },
    ]

    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
    )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : '#FFB533';



    const onValueChange = useCallback(
        (event, newDate) => {
            
            const selectedDate = newDate || date;
            let year = newDate.getFullYear()
            const month = newDate.getMonth()

            // console.log("The selected year",  year )
            // console.log("The selected month",month )

            showPicker(false);
            setDate(selectedDate);

            const fetchData = async () => {

                const credentials = await Keychain.getGenericPassword();

                if (credentials) {
                    console.log(
                        'Credentials successfully loaded for user ' + credentials.username,
                    );
                    const token = credentials.username;
                    setToken(token)

                    const params = {
                        token: token,
                        app_user_id: userData.id,
                        month: month + "",
                        year: year + ""
                    }
                    console.log("parmas", params)

                    TargetVsAchievementFunc(params)

                }
            };

            fetchData()

         
        },
        [date, showPicker],
    );


    useEffect(() => {
        const fetchData = async () => {

  
            let year = date.getFullYear()
            const month = date.getMonth()


            console.log("todayy",year, month)

            const credentials = await Keychain.getGenericPassword();

            if (credentials) {
                console.log(
                    'Credentials successfully loaded for user ' + credentials.username,
                );
                const token = credentials.username;
                setToken(token)

                const params = {
                    token: token,
                    app_user_id: userData.id,
                    month: month + "",
                    year: year + ""
                }
                console.log("parmas", params)

                TargetVsAchievementFunc(params)

            }
        };

        fetchData()

    }, [])



    useEffect(() => {
        if (TargetVsAchievementData) {
            console.log("TargetVsAchievementData", TargetVsAchievementData)
            setData([TargetVsAchievementData.body])
        }
        else {
            console.log("TargetVsAchievementError", TargetVsAchievementError)
        }

    }, [TargetVsAchievementData, TargetVsAchievementError])

    const AchievementCard = (props) => {

        return (
            <View onPress={() => {

            }}
                style={{ marginTop: 70 }}
            >
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 20, borderWidth: 1, borderColor: 'black', alignItems: 'center', height: 150 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: 'black', width: '100%', height: 70, backgroundColor:ternaryThemeColor }}>
                        <Image style={{ height: 30, width: 30, marginRight: 10, marginTop: 4 }} source={require('../../assets/images/target.png')}></Image>
                        <Text style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 20 }}>Target</Text>
                    </View>

                    <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, borderColor: 'red', }}>{props?.target}</Text>

                    </View>

                </View>

                <View>
                    <PoppinsTextMedium content={"Vs"} style={{ marginTop: 20, marginBottom: 20, color: 'black', fontWeight: 'bold', fontSize: 19 }} />
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginHorizontal: 20, borderWidth: 1, borderColor: 'black', alignItems: 'center', height: 150, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: 'black', width: '100%', height: 70, backgroundColor:"#3F704D" }}>
                        <Image style={{ height: 30, width: 20, marginRight: 10, marginTop: 4 }} source={require('../../assets/images/achieve.png')}></Image>
                        <Text style={{ fontWeight: 'bold', color: '#808080', fontSize: 20 , color:'white'}}>Achievement</Text>
                    </View>

                    <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, borderColor: 'red', }}>{props?.achievement}</Text>

                    </View>

                </View>

            </View>
        )

    }


    return (
        <View style={styles.container}>
            <View
                style={{
                    height: 50,
                    width: '100%',
                    backgroundColor: ternaryThemeColor,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    // marginTop: 10,
                }}>
                <TouchableOpacity
                    style={{ height: 20, width: 20, position: 'absolute', left: 20, marginTop: 10 }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 5 }}
                        source={require('../../assets/images/blackBack.png')}></Image>
                </TouchableOpacity>

                <PoppinsTextMedium style={{ fontSize: 20, color: '#ffffff', marginTop: 10, position: 'absolute', left: 50,  }} content={"Target vs Achievement"}></PoppinsTextMedium>
            </View>

            {/* <InputDateProfile label={"Month"} data={moment().format("DD-MMM-YYYY")} title={"Month"} handleData={() => { }}></InputDateProfile> */}

            <TouchableOpacity style={{ marginHorizontal: 20, marginTop: 10, }}>
                <TouchableOpacity onPress={() => { showPicker(true) }} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, borderWidth: 1, borderColor: '#808080', height: 50, alignItems: 'center', borderRadius: 9 }} >
                    <Text style={{ fontWeight: 'bold', color: '#808080', }}>Select Month & Year</Text>
                    <Text style={{ color: 'black' }}>{date ? moment(date).format("MMM-YYYY") : moment().format("MMM-YYYY")}</Text>
                </TouchableOpacity>
            </TouchableOpacity>

            {show && (
                <MonthPicker
                    onChange={onValueChange}
                    value={date}
                    // minimumDate={new Date()}
                    maximumDate={new Date()}
                // locale="IN"
                />
            )}

            {

                TargetVsAchievementData?.message == "Not Found " &&
                
                <DataNotFound/>
            }

            {
                data&&
                <FlatList
                    initialNumToRender={20}
                    // contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
                    data={data}
                    renderItem={({ item, index }) => (
                        <AchievementCard
                            key={index}
                            achievement={item.achived_amount}
                            target={item.target_amount}

                        ></AchievementCard>
                    )}
                ></FlatList>

            }


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default TargetVsAchievement;
