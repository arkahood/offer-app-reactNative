import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import {Card} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {addOffer} from '../redux/slices/offerSlice';
import EncryptedStorage from 'react-native-encrypted-storage';

type EachResturentProps = {
  name: string;
  address: string;
  coupon_code: string;
  discount: string;
  url: string;
};

const EachResturentCard = ({
  name,
  address,
  coupon_code,
  discount,
  url,
}: EachResturentProps): JSX.Element => {
  const dispatch = useDispatch();

  const offersInRedux = useSelector((state: any) => state.offer);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    console.log(offersInRedux);
    let flag = true;
    offersInRedux.data.forEach((item: any) => {
      if (item.name === name) {
        setDisabled(true);
        flag = false;
      }
    });
    if (flag) {
      setDisabled(false);
    }
  }, [offersInRedux, name]);

  const storeOffer = async () => {
    try {
      const prevData: any = await EncryptedStorage.getItem('offer');
      if (prevData === null) {
        await EncryptedStorage.setItem(
          'offer',
          JSON.stringify({
            data: [{name: name, coupon_code: coupon_code}],
          }),
        );
      } else {
        const prevDatainJson = JSON.parse(prevData);

        await EncryptedStorage.removeItem('offer');
        await EncryptedStorage.setItem(
          'offer',
          JSON.stringify({
            data: [
              ...prevDatainJson.data,
              {name: name, coupon_code: coupon_code},
            ],
          }),
        );
      }
    } catch (error) {
      console.log('Error while Storing the offer in async Storage');
    }
  };
  const handleRevealPromoCode = async () => {
    Alert.alert(`Congratulation!!! Promo Code is- ${coupon_code}`);
    await storeOffer();
    const data: any = await EncryptedStorage.getItem('offer');
    if (data === null) {
      dispatch(addOffer({data: [{name: name, coupon_code: coupon_code}]}));
    } else {
      const datainJson = JSON.parse(data);
      dispatch(addOffer(datainJson));
    }
  };

  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{padding: 0}}
        source={{
          uri: url,
        }}
      />
      <Card.Divider />
      <Text>Address : {address}</Text>
      <View style={styles.discount}>
        <Text style={{fontSize: 30, color: 'white'}}>{discount}%</Text>
      </View>
      <TouchableOpacity
        style={disabled ? styles.disablebutton : styles.button}
        disabled={disabled}
        onPress={handleRevealPromoCode}>
        <Text style={{fontSize: 20, color: 'white'}}>
          {disabled ? 'Offer Already Redeemed' : 'Reveal Promo Code'}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  discount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 80,
    height: 50,
    borderTopLeftRadius: 15,
    right: -300,
    top: -50,
  },
  button: {
    backgroundColor: '#1877F2',
    alignItems: 'center',
    padding: 10,
  },
  disablebutton: {
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 10,
  },
});

export default EachResturentCard;
