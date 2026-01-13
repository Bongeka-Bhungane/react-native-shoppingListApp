import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AddItemFormProps {
  onAddItem: (name: string, quantity: number) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!name.trim()) {
      setError("Please enter an item name");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) {
      setError("Please enter a valid quantity");
      return;
    }

    onAddItem(name.trim(), qty);
    setName("");
    setQuantity("1");
    setError("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.nameInput, { color: "#ffffffff" }]}
          placeholder="Item name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError("");
          }}
          accessibilityLabel="Item name input"
        />
        <TextInput
          style={[styles.input, styles.quantityInput]}
          placeholder="Qty"
          value={quantity}
          onChangeText={(text) => {
            setQuantity(text);
            setError("");
          }}
          keyboardType="numeric"
          accessibilityLabel="Quantity input"
        />
        <Pressable
          style={styles.addButton}
          onPress={handleAdd}
          accessibilityLabel="Add item button"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </Pressable>
      </View>
      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#9A8FD3",
    color: "#f1f4f8ff",
  },
  nameInput: {
    flex: 1,
    color: "#f1f4f8ff",
  },
  quantityInput: {
    width: 70,
    color: "#f1f4f8ff",
  },
  addButton: {
    backgroundColor: "#9A8FD3",
    borderRadius: 8,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
  },
});
