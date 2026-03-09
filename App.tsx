import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import 'react-native-get-random-values'
import { store, persistor } from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import Frame from "./src/components/Frame";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Frame>
          <HomeScreen />
        </Frame>
      </PersistGate>
    </Provider>
  );
}
