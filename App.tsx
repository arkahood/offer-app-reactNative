/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Provider } from "react-redux";
import WelcomeScreen from "./WelcomeScreen";
import { store } from "./redux/store";


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <WelcomeScreen />
    </Provider>
    );
}

export default App;
