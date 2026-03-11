import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingListState {
  items: Item[];
  searchQuery: string;
}

const initialState: ShoppingListState = {
  items: [],
  searchQuery: "",
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>,
    ) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload.name,
        quantity: action.payload.quantity,
        purchased: false,
      });
    },

    editItem: (
      state,
      action: PayloadAction<{ id: string; name: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
        item.quantity = action.payload.quantity;
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },

    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },

    // Search functionality
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  setItems,
  setSearchQuery,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
