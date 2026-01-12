import { configureStore } from "@reduxjs/toolkit";
import shoppingListReducer from "./reducers";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

// TypeScript types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
