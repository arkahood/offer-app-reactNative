import React from 'react';
import { View , Text, FlatList} from "react-native";
import resturentData from '../mock/resturent.json';
import EachResturentCard from '../components/EachResturentCard';

const Home  = () : JSX.Element => {
    console.log(resturentData[0]);
    return(
        <View style={{marginBottom:10}}>
            
            <FlatList
                data={resturentData}
                renderItem={({item}:any)=>(
                    <EachResturentCard 
                    name={item.name} 
                    address={item.address}
                    url={item.url}/>
                )}
                keyExtractor={(item:any)=>item.name}
            />
        </View>
    )
}

export default Home;