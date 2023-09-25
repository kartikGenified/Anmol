import React, {useEffect, useId, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {useFetchGiftCatalogueByUserTypeAndCatalogueTypeMutation} from '../../apiServices/gifts/GiftApi';
import {useFetchUserPointsMutation} from '../../apiServices/workflow/rewards/GetPointsApi';
import * as Keychain from 'react-native-keychain';
import {BaseUrlImages} from '../../utils/BaseUrlImages';

const RedeemGifts = ({navigation}) => {
  const [search, setSearch] = useState();
  const pointBalance = 300;
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  const secondaryThemeColor = useSelector(
    state => state.apptheme.secondaryThemeColor,
  )
    ? useSelector(state => state.apptheme.secondaryThemeColor)
    : '#FFB533';
  const userId = useSelector(state => state.appusersdata.id);

  const [
    fetchGiftCatalogue,
    {data: giftCatalogueData, error: giftCatalogueError},
  ] = useFetchGiftCatalogueByUserTypeAndCatalogueTypeMutation();

  const [
    userPointFunc,
    {
      data: userPointData,
      error: userPointError,
      isLoading: userPointIsLoading,
      isError: userPointIsError,
    },
  ] = useFetchUserPointsMutation();

  useEffect(() => {
    const getData = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username,
        );
        const token = credentials.username;
        const params = {userId: userId, token: token};
        userPointFunc(params);
        fetchGiftCatalogue({
          token: token,
          type: 'point',
          limit: 1000,
          offset: 0,
        });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (giftCatalogueData) {
      console.log('giftCatalogueData', giftCatalogueData.body[0].images);
    } else if (giftCatalogueError) {
      console.log('giftCatalogueError', giftCatalogueError);
    }
  }, [giftCatalogueData, giftCatalogueError]);
  useEffect(() => {
    if (userPointData) {
      console.log('userPointData', userPointData);
    } else if (userPointError) {
      console.log('userPointError', userPointError);
    }
  }, [userPointData, userPointError]);
  const Categories = props => {
    const image = props.image;
    const data = props.data;
    return (
      <View
        style={{
          marginLeft: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 35,
            marginLeft: 0,
            backgroundColor: secondaryThemeColor,
          }}>
          <Image
            style={{height: 30, width: 30, resizeMode: 'contain'}}
            source={image}></Image>
        </View>
        <PoppinsTextMedium
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: '600',
            marginTop: 2,
          }}
          content={data}></PoppinsTextMedium>
      </View>
    );
  };
  const RewardsBox = props => {
    const [image, setImage] = useState();
    const [points, setPoints] = useState();
    const [product, setProduct] = useState();
    const [category, setCategory] = useState();

    useEffect(() => {
      setImage(props.image);
      setPoints(props.points);
      setProduct(props.product);
      setCategory(props.category);
    }, []);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CartList', {
            data: props.data,
          });
        }}
        style={{
          height: 120,
          width: '90%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderWidth: 0.6,
          borderColor: '#EEEEEE',
          backgroundColor: '#FFFFFF',
          margin: 10,
          marginLeft: 20,
          elevation: 4,
        }}>
        <View
          style={{
            height: '40%',
            width: '100%',
            backgroundColor: secondaryThemeColor,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '80%',
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.4,
              borderColor: '#DDDDDD',
              backgroundColor: 'white',
              marginLeft: 20,
              top: 14,
            }}>
            <Image
              style={{height: 30, width: 30, resizeMode: 'contain'}}
              source={{uri: BaseUrlImages + image}}></Image>
          </View>
          <LinearGradient
            style={{
              height: 30,
              padding: 4,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderRadius: 4,
              position: 'absolute',
              right: 60,
            }}
            colors={['#FF9100', '#E4C52B']}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/coin.png')}></Image>
            <PoppinsTextMedium
              style={{
                fontSize: 12,
                color: 'white',
                fontWeight: '700',
                marginLeft: 10,
              }}
              content={`Points : ${points}`}></PoppinsTextMedium>
          </LinearGradient>
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#353535',
              position: 'absolute',
              right: 20,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: 20, width: 20, resizeMode: 'contain'}}
              source={require('../../../assets/images/cart.png')}></Image>
          </View>
        </View>
        <View
          style={{
            height: '60%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: 4,
            width: '100%',
          }}>
          <PoppinsTextMedium
            style={{color: 'black', fontSize: 12, width: '90%', marginLeft: 4}}
            content={product}></PoppinsTextMedium>

          <PoppinsTextMedium
            style={{color: '#919191', fontSize: 12, width: '90%'}}
            content={category}></PoppinsTextMedium>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: ternaryThemeColor,
        height: '100%',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          height: '10%',
          marginLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              marginLeft: 10,
            }}
            source={require('../../../assets/images/blackBack.png')}></Image>
        </TouchableOpacity>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <PoppinsTextMedium
            content="Redeem Points"
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: '700',
              color: 'white',
            }}></PoppinsTextMedium>
          <PoppinsTextMedium
            content={`${pointBalance} pts available`}
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: '700',
              color: 'white',
            }}></PoppinsTextMedium>
        </View>
      </View>
      <View
        style={{
          height: '90%',
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          alignItems: 'center',
          justifyContent: 'flexx-start',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: '#EFF6FC',
            width: '100%',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 40,
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 20,
              }}>
              <Icon
                style={{position: 'absolute', left: 10}}
                name="magnifying-glass"
                size={30}
                color={ternaryThemeColor}></Icon>
              <TextInput
                style={{marginLeft: 20}}
                placeholder="Type Product Name"
                value={search}
                onChangeText={text => {
                  setSearch(text);
                }}></TextInput>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Image
                style={{height: 26, width: 26, resizeMode: 'contain'}}
                source={require('../../../assets/images/settings.png')}></Image>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: 40, width: 40, resizeMode: 'contain'}}
              source={require('../../../assets/images/categories.png')}></Image>
            <PoppinsTextMedium
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '600',
                marginTop: 2,
              }}
              content="All"></PoppinsTextMedium>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <Categories
              data="Electronics"
              image={require('../../../assets/images/box.png')}></Categories>
          </ScrollView>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 240,
          }}>
          <PoppinsTextMedium
            style={{
              color: '#171717',
              fontSize: 14,
              fontWeight: '700',
              marginTop: 10,
              marginBottom: 10,
            }}
            content="Rewards"></PoppinsTextMedium>
          {giftCatalogueData && (
            <FlatList
              data={giftCatalogueData.body}
              style={{width: '100%'}}
              contentContainerStyle={{width: '100%'}}
              renderItem={({item, index}) => {
                console.log(index + 1, item);
                return (
                  <RewardsBox
                    data={item}
                    key={index}
                    product={item.name}
                    category={item.catalogue_name}
                    points={item.points}
                    image={item.images[0]}></RewardsBox>
                );
              }}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedeemGifts;
