import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import RewardSquare from '../atoms/RewardSquare';
import { useSelector } from 'react-redux';
import { useFetchUserPointsMutation } from '../../apiServices/workflow/rewards/GetPointsApi';
import * as Keychain from 'react-native-keychain';
import FastImage from 'react-native-fast-image';
import { useGetTransactionStatsMutation } from '../../apiServices/transactionStatsApi/transactionStatsApi';

const RewardBox = () => {
    const workflow = useSelector(state => state.appWorkflow.program)
    const id = useSelector(state => state.appusersdata.id);


    const [getTransactionStatsFunct, {
        data: userPointData,
        error: userPointError,
        isLoading: userPointIsLoading,
        isError: userPointIsError
    }] = useGetTransactionStatsMutation();


    const fetchPoints = async () => {
        const credentials = await Keychain.getGenericPassword();
        const token = credentials.username;
        const params = {
            userId: id,
            token: token
        }
        // userPointFunc(params)
        getTransactionStatsFunct(token)
    }

    useEffect(() => {
        fetchPoints()
    }, []);




    useEffect(() => {
        if (userPointData) {
            console.log("userPointData-------------->", userPointData)
        }
        else if (userPointError) {
            console.log("userPointError", userPointError)
        }

    }, [userPointData, userPointError])


    console.log(workflow)
    return (
        <View style={{ padding: 4, width: '100%', borderRadius: 14, elevation: 4, backgroundColor: 'white', height: 170 }}>

            {/* {userPointIsLoading &&
                <FastImage
                    style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }}
                    source={{
                        uri: gifUri, // Update the path to your GIF
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            } */}


            {userPointData && userPointData?.body &&
                <ScrollView contentContainerStyle={{ height: '100%' }} style={{ borderRadius: 20, padding: 4, height: 150 }} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {
                        userPointData && userPointData && userPointData.body?.[0]?.success_cnt && <RewardSquare amount={userPointData?.body?.[0]?.total_uploaded_amount_transfer} color="#DCFCE7" image={require('../../../assets/images/points.png')} title="Transfered Amount"></RewardSquare>
                    }
                    {
                        userPointData && userPointData.body?.[0]?.total_uploaded_amount_left && <RewardSquare amount={userPointData.body?.[0]?.total_uploaded_amount_left} color="#DCFCE7" image={require('../../../assets/images/points.png')} title="Pending Amount"></RewardSquare>
                    }
               
                    {
                        userPointData && userPointData && userPointData.body?.[0]?.success_cnt && <RewardSquare amount={userPointData?.body?.[0]?.success_cnt} color="#DCFCE7" image={require('../../../assets/images/points.png')} title="Approved Transaction"></RewardSquare>
                    }
     {
                        userPointData?.body?.[0]?.not_initiated_cnt && <RewardSquare amount={userPointData?.body?.[0]?.not_initiated_cnt} color="#DCFCE7" image={require('../../../assets/images/points.png')} title="Pending Transaction"></RewardSquare>
                    }








                </ScrollView>
            }


        </View>
    )
}

const styles = StyleSheet.create({})

export default RewardBox;