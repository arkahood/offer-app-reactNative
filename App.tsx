/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from "react-redux";
import WelcomeScreen from "./WelcomeScreen";
import { store } from "./redux/store";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";


function App(): JSX.Element {
  useEffect(()=>{
    console.log('heyy');
    
  },[])
  return (
    <Provider store={store}>
      <StatusBar backgroundColor='red'/>
      <PaperProvider>
      <WelcomeScreen />
      </PaperProvider>
    </Provider>
    );
}

export default App;
