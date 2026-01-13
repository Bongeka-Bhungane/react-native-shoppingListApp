import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import ShoppingListScreen from "./src/screens/ShoppingLIstScreen";

export default function Index() {
  return (
    <Provider store={store}>
      <ShoppingListScreen />
    </Provider>
  );
}
