import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Plus, Minus, Trash } from "phosphor-react-native";

const INITIAL_CART = [
  { id: "1", name: "Smart Watch", price: 4500, quantity: 1 },
  { id: "2", name: "USB Cable", price: 800, quantity: 2 },
  { id: "3", name: "Power Bank", price: 2500, quantity: 1 },
];

export function CartScreen({ navigation }) {
  const [cart, setCart] = useState(INITIAL_CART);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      {/* 🔹 Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty. Go back to shopping by clicking Home</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Ksh {item.price}</Text>
            </View>

            {/* 🔹 Quantity Controls */}
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                <Minus size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQty(item.id)}>
                <Plus size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* 🔹 Remove Button */}
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Trash size={24} color="#e63946" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 🔹 Footer Section */}
      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: Ksh {total.toLocaleString()}</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.smallBtn, { backgroundColor: "#5f2c4eff" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.btnText}>Add More</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.smallBtn, { backgroundColor: "#e63946" }]}
              onPress={clearCart}
            >
              <Text style={styles.btnText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => alert("Proceeding to checkout...")}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  cartCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    color: "green",
    fontWeight: "500",
    marginTop: 3,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  footer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  smallBtn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  checkoutBtn: {
    backgroundColor: "dodgerblue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 50,
    fontSize: 16,
  },
});
