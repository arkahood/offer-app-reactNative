import {Card, Text} from '@rneui/base';
import React, {useEffect, useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {deleteOffer} from '../redux/slices/offerSlice';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

type EachOfferCardProp = {
  coupon_code: string;
  name: string;
};

const EachOfferCard = ({coupon_code, name}: EachOfferCardProp): JSX.Element => {
  const dispatch = useDispatch();

  const pan = useRef(new Animated.ValueXY()).current;

  const offer = useSelector((state: any) => state.offer);

  const handleDeleteFromAsyncStorage = async () => {
    await EncryptedStorage.setItem('offer', JSON.stringify(offer));
  };

  useEffect(() => {
    console.log('inside each Offer', offer);
    handleDeleteFromAsyncStorage();
  }, [offer]);

  const panHandler = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          // dy: pan.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: async () => {
      dispatch(deleteOffer(name));

      Animated.spring(
        pan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: false}, // Back to zero
      ).start();
    },
  });

  return (
    <Animated.View style={pan.getLayout()} {...panHandler.panHandlers}>
      <Card containerStyle={styles.coupon_container}>
        <Text h3>{coupon_code}</Text>
        <Text>{name}</Text>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coupon_container: {
    borderRadius: 10,
  },
});

export default EachOfferCard;
