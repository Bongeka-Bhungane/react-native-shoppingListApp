import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../redux/store";
import {
  addItem,
  editItem,
  deleteItem,
  togglePurchased,
  setItems,
} from "../redux/reducers";
import ItemCard from "../components/ItemCard";
import AddItemForm from "../components/AddItemForm";
import EditItemModal from "../components/EditItemModal";
import SearchBar from "../components/SearchBar";

const STORAGE_KEY = "@shopping_list_items";

export default function ShoppingListScreen() {
  const { items, searchQuery } = useSelector(
    (state: RootState) => state.shoppingList,
  );

  const dispatch = useDispatch();

  const [editingItem, setEditingItem] = useState<{
    id: string;
    name: string;
    quantity: number;
  } | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    saveItems();
  }, [items]);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        dispatch(setItems(parsedItems));
      }
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  const saveItems = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving items:", error);
    }
  };

  const handleAddItem = (name: string, quantity: number) => {
    dispatch(addItem({ name, quantity }));
  };

  const handleEditItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setEditingItem({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      });
      setIsEditModalVisible(true);
    }
  };

  const handleSaveEdit = (id: string, name: string, quantity: number) => {
    dispatch(editItem({ id, name, quantity }));
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteItem(id)),
        },
      ],
    );
  };

  const handleTogglePurchased = (id: string) => {
    dispatch(togglePurchased(id));
  };

  const purchasedCount = items.filter((item) => item.purchased).length;
  const totalCount = items.length;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        {totalCount > 0 && (
          <Text style={styles.stats}>
            {purchasedCount} of {totalCount} purchased
          </Text>
        )}
      </View>

      <SearchBar />

      <AddItemForm onAddItem={handleAddItem} />

      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items found</Text>
          <Text style={styles.emptySubtext}>
            Try searching for something else
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              purchased={item.purchased}
              onTogglePurchased={handleTogglePurchased}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <EditItemModal
        visible={isEditModalVisible}
        item={editingItem}
        onClose={() => {
          setIsEditModalVisible(false);
          setEditingItem(null);
        }}
        onSave={handleSaveEdit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderColor: "#5e519cff",
    borderRadius: 20,
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5e519cff",
    marginBottom: 4,
  },
  stats: {
    fontSize: 14,
    color: "#9A8FD3",
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5e519cff",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9A8FD3",
  },
});
