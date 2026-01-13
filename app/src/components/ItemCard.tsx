import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ItemCardProps {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  onTogglePurchased: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ItemCard({
  id,
  name,
  quantity,
  purchased,
  onTogglePurchased,
  onEdit,
  onDelete,
}: ItemCardProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onTogglePurchased(id)}
        style={styles.checkboxContainer}
        accessibilityLabel={`Mark ${name} as ${
          purchased ? "not purchased" : "purchased"
        }`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: purchased }}
      >
        {purchased ? (
          <Ionicons name="checkbox" size={24} color="#9a8fd3" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#5e519cff" />
        )}
      </Pressable>

      <View style={styles.contentContainer}>
        <Text style={[styles.itemName, purchased && styles.purchasedText]}>
          {name}
        </Text>
        <Text style={styles.quantity}>Qty: {quantity}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          onPress={() => onEdit(id)}
          style={styles.actionButton}
          accessibilityLabel={`Edit ${name}`}
          accessibilityRole="button"
        >
          <Ionicons name="create" size={20} color="#9A8FD3" />
        </Pressable>
        <Pressable
          onPress={() => onDelete(id)}
          style={styles.actionButton}
          accessibilityLabel={`Delete ${name}`}
          accessibilityRole="button"
        >
          <Ionicons name="trash" size={20} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkboxContainer: {
    marginRight: 12,
    borderColor: "#5e519cff",
  },
  contentContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5e519cff",
    marginBottom: 4,
  },
  purchasedText: {
    textDecorationLine: "line-through",
    color: "#9288c9",
  },
  quantity: {
    fontSize: 14,
    color: "#b896d4ff",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});
