import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import PoppinsText from "../../components/electrons/customFonts/PoppinsText";
import PoppinsTextMedium from "../../components/electrons/customFonts/PoppinsTextMedium";
import { useSelector } from "react-redux";
import * as Keychain from "react-native-keychain";
import { useFetchCashbackEnteriesOfUserMutation } from "../../apiServices/workflow/rewards/GetCashbackApi";
import DataNotFound from "../data not found/DataNotFound";
import AnimatedDots from "../../components/animations/AnimatedDots";
import { useGetCashTransactionsMutation, useGetCashTransactionsWithFilterMutation } from "../../apiServices/cashback/CashbackRedeemApi";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { gifUri } from "../../utils/GifUri";
import { useGetTransactionStatsMutation } from "../../apiServices/transactionStatsApi/transactionStatsApi";
import FilterModal from "../../components/modals/FilterModal";
import PoppinsTextLeftMedium from "../../components/electrons/customFonts/PoppinsTextLeftMedium";

const CashbackHistory = ({ navigation }) => {
  const [showNoDataFound, setShowNoDataFound] = useState(false);
  const [totalCashbackEarned, setTotalCashbackEarned] = useState(0)
  const [cashbackList, setCashBackList] = useState([]);
  const [openBottomModal, setOpenBottomModal] = useState(false)
  const [message, setMessage] = useState("")

  const userId = useSelector((state) => state.appusersdata.userId);
  const userData = useSelector((state) => state.appusersdata.userData);

  const ternaryThemeColor = useSelector(
    (state) => state.apptheme.ternaryThemeColor
  )
    ? useSelector((state) => state.apptheme.ternaryThemeColor)
    : "#FFB533";

  console.log(userId);
  let startDate, endDate;

  const [CashTransactionsWithFilterFunct, {
    data: cashTransactionsWithFilterData,
    error: cashTransactionsWithFilterError,
    isLoading: cashTransactionsWithFilterIsLoading,
    isError: cashTransactionsWithFilterIsError
  }] = useGetCashTransactionsWithFilterMutation()

  const [
    getCashTransactionsFunc,
    {
      data: getCashTransactionsData,
      error: getCashTransactionsError,
      isLoading: getCashTransactionsIsLoading,
      isError: getCashTransactionsIsError,
    },
  ] = useGetCashTransactionsMutation();



  const [getTransactionStatsFunct, {
    data: getTransactionStatsData,
    error: getTransactionStatsError,
    isLoading: getTransactionStatsIsLoading,
    isError: getTransactionStatsIsError
  }] = useGetTransactionStatsMutation()


  const filtData = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        "Credentials successfully loaded for user " + credentials.username
      );
      const token = credentials.username;
      const params = { token: token, appUserId: userData.id };
      getCashTransactionsFunc(params);
    }
  };



  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " + credentials.username
        );
        const token = credentials.username;
        const params = { token: token, appUserId: userData.id };
        getCashTransactionsFunc(params);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    if (getCashTransactionsData) {

      setCashBackList(getCashTransactionsData?.body?.data)

      let cashback = 0;
      console.log(
        "getCashTransactionsData",
        JSON.stringify(getCashTransactionsData)
      );



      if (getCashTransactionsData.body && getCashTransactionsData.body.data.length > 0) {
        for (var i = 0; i < getCashTransactionsData.body?.data?.length; i++) {

          if (getCashTransactionsData.body.data[i].approval_status === "1") {
            cashback = cashback + Number(getCashTransactionsData.body.data[i].cash)
            console.log("getCashTransactionsData", getCashTransactionsData.body.data[i].cash, cashback)
          }
        }


        setTotalCashbackEarned(getCashTransactionsData.body.data.reduce((acc, x) => Number(x.cash) + acc, 0))
      }

    } else if (getCashTransactionsError) {
      console.log("getCashTransactionsError", getCashTransactionsError);
    }
  }, [getCashTransactionsData, getCashTransactionsError]);


  useEffect(() => {
    if (getCashTransactionsData) {

      setCashBackList(getCashTransactionsData?.body?.data)

      let cashback = 0;
      console.log(
        "getCashTransactionsData",
        JSON.stringify(getCashTransactionsData)
      );



      if (getCashTransactionsData.body && getCashTransactionsData.body.data.length > 0) {
        for (var i = 0; i < getCashTransactionsData.body?.data?.length; i++) {

          if (getCashTransactionsData.body.data[i].approval_status === "1") {
            cashback = cashback + Number(getCashTransactionsData.body.data[i].cash)
            console.log("getCashTransactionsData", getCashTransactionsData.body.data[i].cash, cashback)
          }
        }


        setTotalCashbackEarned(getCashTransactionsData.body.data.reduce((acc, x) => Number(x.cash) + acc, 0))
      }

    } else if (getCashTransactionsError) {
      console.log("getCashTransactionsError", getCashTransactionsError);
    }
  }, [getCashTransactionsData, getCashTransactionsError]);


  useEffect(() => {
    if (cashTransactionsWithFilterData) {

      setCashBackList(cashTransactionsWithFilterData?.body?.data)

      let cashback = 0;
      console.log(
        "getCashTransactionsData",
        JSON.stringify(cashTransactionsWithFilterData)
      );



      if (getCashTransactionsData.body && getCashTransactionsData.body.data.length > 0) {
        for (var i = 0; i < getCashTransactionsData.body?.data?.length; i++) {

          if (getCashTransactionsData.body.data[i].approval_status === "1") {
            cashback = cashback + Number(getCashTransactionsData.body.data[i].cash)
            console.log("getCashTransactionsFilterData", getCashTransactionsData.body.data[i].cash, cashback)
          }
        }


        setTotalCashbackEarned(getCashTransactionsData.body.data.reduce((acc, x) => Number(x.cash) + acc, 0))
      }

    } else if (cashTransactionsWithFilterError) {
      console.log("getCashTransactionsFilterError", cashTransactionsWithFilterError);
    }
  }, [cashTransactionsWithFilterData, cashTransactionsWithFilterError]);


  const fetchPoints = async () => {
    const credentials = await Keychain.getGenericPassword();
    const token = credentials.username;

    getTransactionStatsFunct(token)

  }

  useEffect(() => {
    fetchPoints()
  }, [])

  // useEffect(()=>{

  // },[getCashTransactionsData, getTransactionStatsError])


  const getFilterData = async (start_date, end_date) => {
    console.log("this date --->", startDate, endDate)
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        "Credentials successfully loaded for user " + credentials.username
      );
      const token = credentials.username;
      const params = { token: token, appUserId: userData.id, start_date: start_date, end_date: end_date };
      CashTransactionsWithFilterFunct(params);
    }
  };



  const onFilter = (data, type) => {
    console.log("submitted", data, type);

    if (type === "start") {
      startDate = data
    }
    if (type === "end") {
      endDate = data
    }

    console.log("start date and end date", startDate, endDate)


  };




  const ModalContent = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDate = (startdate) => {
      // console.log("start date", startdate)
      setStartDate(startdate?.value);
      props.handleFilter(startdate?.value, "start");
    };

    const handleEndDate = (enddate) => {
      // console.log("end date", enddate?.value)
      setEndDate(enddate?.value);
      props.handleFilter(enddate?.value, "end");
    };



    const fetchDataAccToFilter = () => {
      const startTemp = startDate
      const endTemp = endDate
      fetchScannedHistoryData(startTemp, endTemp)
    }

    return (
      <View
        style={{
          height: 320,
          backgroundColor: "white",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <PoppinsTextLeftMedium
          content="Filter Scanned Data"
          style={{
            color: "black",
            marginTop: 20,
            marginLeft: "35%",
            fontWeight: "bold",
          }}
        ></PoppinsTextLeftMedium>
        <View>
          <InputDate data="Start Date" handleData={handleStartDate} />
        </View>
        <View>
          <InputDate data="End Date" handleData={handleEndDate} />
        </View>
        <TouchableOpacity
          onPress={() => {
            fetchDataAccToFilter();
          }}
          style={{
            backgroundColor: ternaryThemeColor,
            marginHorizontal: 50,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <PoppinsTextMedium
            content="SUBMIT"
            style={{ color: "white", fontSize: 20, borderRadius: 10 }}
          ></PoppinsTextMedium>
        </TouchableOpacity>
      </View>
    );
  };

  const modalClose = () => {
    setOpenBottomModal(false);

  };

  const onFilterSubmit = () => {
    console.log("Checking filter data date--->", startDate, endDate)
    getFilterData(startDate, endDate)

  }


  const Header = () => {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#DDDDDD",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <PoppinsTextMedium
          style={{
            marginLeft: 20,
            fontSize: 16,
            position: "absolute",
            left: 10,
            color: "black",
          }}
          content="Transaction Ledger"
        ></PoppinsTextMedium>
        <TouchableOpacity style={{ position: "absolute", right: 20 }}
          onPress={() => {
            setOpenBottomModal(true)
          }}
        >
          <Image style={{ height: 22, width: 22, resizeMode: "contain" }} source={require('../../../assets/images/settings.png')}></Image>
          {/* <Image
            style={{ height: 22, width: 22, resizeMode: "contain" }}
            source={require("../../../assets/images/list.png")}
          ></Image> */}
        </TouchableOpacity>
      </View>
    );
  };
  const CashbackListItem = (props) => {
    const amount = props.items.cash;
    // console.log("amount details", amount);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CashbackDetails", { "data": props.items });
        }}
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "#DDDDDD",
          padding: 4,
          height: 120,
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
          marginBottom: 10
        }}
      >
        <View
          style={{
            width: "80%",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 8
          }}
        >
          <PoppinsTextMedium
            style={{ color: props.items.status === "1" ? "green" : props.items.approval_status === "2" ? "grey" : "red", fontWeight: "600", fontSize: 18 }}
            content={
              props.items.status === "1"
                ? "Credited to cash balance"
                : props.items.status == "2" ? "Pending" :
                  "Declined from the panel"
            }
          ></PoppinsTextMedium>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/images/greenRupee.png")}
            ></Image>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <PoppinsTextMedium
                style={{ color: "black", fontWeight: "600", fontSize: 14 }}
                content={`Beneficiary Details : ${props.items?.bene_name} `}
              ></PoppinsTextMedium>
              <PoppinsTextMedium
                style={{ color: "black", fontWeight: "600", fontSize: 14 }}
                content={`Beneficiary Account : ${props.items?.bene_details?.vpa} `}
              ></PoppinsTextMedium>
              <PoppinsTextMedium
                style={{ color: "#91B406", fontWeight: "600", fontSize: 14 }}
                content={
                  moment(props.items.transaction_on).format("DD-MMM-YYYY") +
                  " " +
                  moment(props.items.transaction_on).format("HH:mm a")
                }
              ></PoppinsTextMedium>
            </View>
          </View>
        </View>
        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <PoppinsTextMedium style={{ color: 'black' }} content={"₹ " + props.items.cash}></PoppinsTextMedium>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
          height: 40,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: "contain",
              marginLeft: 10,
            }}
            source={require("../../../assets/images/blackBack.png")}
          ></Image>
        </TouchableOpacity>
        <PoppinsTextMedium
          content="Transaction History"
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "600",
            color: "#171717",
          }}
        ></PoppinsTextMedium>
        {/* <TouchableOpacity style={{ marginLeft: 160 }}>
                    <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={require('../../../assets/images/notificationOn.png')}></Image>
                </TouchableOpacity> */}
      </View>
      <View
        style={{
          padding: 14,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain",

            }}
            source={require("../../../assets/images/wallet.png")}
          ></Image>
          <PoppinsTextMedium
            style={{
              marginLeft: 10,
              fontSize: 15,
              fontWeight: "700",
              color: "#6E6E6E",
            }}
            content={"Total transaction amount till date ₹ " + totalCashbackEarned.toPrecision(5)}
          ></PoppinsTextMedium>
          {/* <PoppinsText style={{ marginLeft: 10, fontSize: 34, fontWeight: '600', color: 'black' }} content={fetchCashbackEnteriesData?.body?.total != undefined ?  `${fetchCashbackEnteriesData?.body?.total}` : <AnimatedDots color={'black'}/>}></PoppinsText> */}
        </View>

        {/* <PoppinsTextMedium style={{marginLeft:10,fontSize:20,fontWeight:'600',color:'#6E6E6E'}} content="Cashback"></PoppinsTextMedium> */}
        {/* <PoppinsTextMedium
          style={{
            marginLeft: 10,
            fontSize: 20,
            fontWeight: "600",
            color: "#6E6E6E",
          }}
          content="Cashbacks are now instantly credited"
        ></PoppinsTextMedium> */}

      </View>
      <Header></Header>


      {getCashTransactionsData && getCashTransactionsData?.body?.data?.length >= 0 &&
        cashbackList.length > 0 ?
        <FlatList
          initialNumToRender={20}
          contentContainerStyle={{



          }}
          style={{ width: "100%", height: '80%' }}
          data={cashbackList}
          renderItem={({ item, index }) => (
            <CashbackListItem items={item}></CashbackListItem>
          )}
          keyExtractor={(item, index) => index}
        />
        :
        <View style={{ width: '100%', alignItems: "center" }}>
          {
            getCashTransactionsData?.body?.length == 0 && cashbackList.length == 0 ? <DataNotFound />
              : cashTransactionsWithFilterData?.body?.data.length <= 0 ? <DataNotFound /> : <View></View>
          }
        </View>

      }





      {getCashTransactionsIsLoading &&
        <View>
          <FastImage
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: '60%' }}
            source={{
              uri: gifUri, // Update the path to your GIF
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          {/* <PoppinsTextMedium style={{ color: 'black', fontWeight: '600', fontSize: 12, marginTop: 30 }} content="No Form Field Available Yet!"></PoppinsTextMedium> */}
        </View>

      }

      {openBottomModal && (
        <FilterModal
          modalClose={modalClose}
          message={message}
          openModal={openBottomModal}
          handleFilter={onFilter}
          comp={ModalContent}
          onSubmit={onFilterSubmit}
        ></FilterModal>
      )}

      {getCashTransactionsData?.body?.count == 0 &&
        <View style={{ width: '100%', }}>
          <View style={{ marginBottom: "65%", }}>
            <DataNotFound />
          </View>
        </View>
      }


    </View>
  );
};

const styles = StyleSheet.create({});

export default CashbackHistory;