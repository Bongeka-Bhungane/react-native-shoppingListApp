import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearchQuery } from "../redux/reducers";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.shoppingList.searchQuery,
  );

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search items..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "#5e519cff",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#5e519cff",
    borderWidth: 1,
    color: "#5e519cff",
  },
});
