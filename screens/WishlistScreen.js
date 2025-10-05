import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DUMMY_WISHLIST = [
  { id: "1", name: "Gaming Mouse", price: 1800 },
  { id: "2", name: "Mechanical Keyboard", price: 5400 },
  { id: "3", name: "Monitor Stand", price: 3200 },
];

export function WishlistScreen() {
  const [wishlist, setWishlist] = useState(DUMMY_WISHLIST);
  const navigation = useNavigation();

  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    Alert.alert("Success", `${item.name} moved to cart!`);
    setWishlist((prev) => prev.filter((w) => w.id !== item.id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 , marginTop: 20, }}>
        My Wishlist
      </Text>

      <Text style={{ color: "gray", marginBottom: 10 }}>
        Your favorites are here!
      </Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "gray", marginTop: 50 }}>
            Your wishlist is empty. Go back to shopping by clicking Home!
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              elevation: 2,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: "green", marginBottom: 10 }}>
              Ksh {item.price}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                style={{
                  backgroundColor: "#007bff",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRemove(item.id)}
                style={{
                  backgroundColor: "#e63946",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          backgroundColor: "#28a745",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          Add More Products
        </Text>
      </TouchableOpacity>
    </View>
  );
}
