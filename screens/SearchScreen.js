import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react-native";

const { width } = Dimensions.get("window");

export function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://eco-backend-lime.vercel.app/api/products");

        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Handle search filter
  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === "") {
      setFiltered(products);
    } else {
      const results = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(results);
    }
  };

  // 🎨 Render each product in grid
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image
        source={{ uri: item.images?.[0] || item.display_photo }}
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.price}>Ksh {item.currentPrice}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBar}>
        <MagnifyingGlass size={24} color="gray" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Search products..."
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Text style={{ color: "gray", fontWeight: "bold" }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 🛍 Products Grid */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#e63946"
          style={{ marginTop: 50 }}
        />
      ) : filtered.length > 0 ? (
        <FlatList
          data={filtered}
          renderItem={renderProduct}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <Text style={styles.noResult}>No products found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 15,
    marginTop: 30,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    width: width / 2 - 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#e63946",
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cartBtn: {
    flex: 1,
    backgroundColor: "#457b9d",
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 4,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#e63946",
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 4,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
  },
  noResult: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
