import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import EachOfferCard from '../components/EachOfferCard';
import EncryptedStorage from 'react-native-encrypted-storage';

const Offers = (): JSX.Element => {
  const offers = useSelector((state: any) => state.offer);
  if (offers.data.length === 0) {
    EncryptedStorage.removeItem('offer');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={offers.data}
        renderItem={(item: any) => (
          <EachOfferCard
            coupon_code={item.item.coupon_code}
            name={item.item.name}
          />
        )}
        keyExtractor={(item: any) => item.name}
      />
      <View style={styles.bottomText}>
        <Text>Swipe to delete</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default Offers;
