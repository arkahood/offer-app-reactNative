import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import resturentData from '../mock/resturent.json';
import EachResturentCard from '../components/EachResturentCard';
import {SearchBar} from '@rneui/base';

const Home = (): JSX.Element => {
  const [searchText, setSearchText] = useState<string>('');
  const [listData, setListData] = useState(resturentData);

  const handleSearch = (e: string) => {
    setSearchText(e.toLowerCase());
    let temp = [];
    for (let i in resturentData) {
      if (resturentData[i].name.toLowerCase().includes(searchText)) {
        temp.push(resturentData[i]);
      }
    }
    setListData(temp);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          platform="ios"
          placeholder="search"
          value={searchText}
          onChangeText={e => handleSearch(e)}
          searchIcon={false}
        />
      </View>
      <FlatList
        data={searchText.length === 0 ? resturentData : listData}
        renderItem={({item}: any) => (
          <EachResturentCard
            name={item.name}
            address={item.address}
            url={item.url}
            discount={item.discount}
            coupon_code={item.coupon_code}
          />
        )}
        keyExtractor={(item: any) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 10,
    borderRadius: 25,
  },
  container: {
    marginBottom: 100,
  },
});

export default Home;
