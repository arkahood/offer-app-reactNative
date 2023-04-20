import React from 'react';
import { View , Text, FlatList} from "react-native";
import resturentData from '../mock/resturent.json';
import EachResturentCard from '../components/EachResturentCard';

const Home  = () : JSX.Element => {
    
    return(
        <View style={{marginBottom:10}}>
            
            <FlatList
                data={resturentData}
                renderItem={({item}:any)=>(
                    <EachResturentCard 
                    name={item.name} 
                    address={item.address}
                    url={item.url}
                    discount={item.discount} 
                    coupon_code={item.coupon_code}
                    />
                )}
                keyExtractor={(item:any)=>item.name}
            />
        </View>
    )
}

export default Home;