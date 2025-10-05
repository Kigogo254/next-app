import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { MagnifyingGlass, Star } from "phosphor-react-native";

const { width } = Dimensions.get("window");

export function HomeScreen({ navigation }) {
  const scrollRef = useRef(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 New search state
  const [searchQuery, setSearchQuery] = useState("");

  // 🧠 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://10.132.72.106:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🌀 Auto-slide banner
  const bannerImages = [
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1019/600/300",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (bannerIndex + 1) % bannerImages.length;
      scrollRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setBannerIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerIndex]);

  // ⭐ Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          color={i <= rating ? "#FFD700" : "#ccc"}
          weight={i <= rating ? "fill" : "regular"}
        />
      );
    }
    return <View style={styles.starRow}>{stars}</View>;
  };

  // 🔎 Filter products based on search query
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <MagnifyingGlass size={28} color="#333" weight="bold" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 🖼 Banner */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={styles.bannerContainer}
      >
        {bannerImages.map((img, index) => (
          <View key={index} style={styles.bannerWrapper}>
            <Image source={{ uri: img }} style={styles.bannerImage} />
            <TouchableOpacity
              style={styles.shopNowBtn}
              onPress={() => navigation.navigate("Search")}
            >
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* 🛒 Products */}
      <Text style={styles.sectionTitle}>🛍️ Products</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e63946" style={{ marginTop: 30 }} />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
              No products found
            </Text>
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((item, index) => {
                const stock = item.countInStock || 0;
                const stockColor =
                  stock < 20 ? "red" : stock <= 35 ? "blue" : "green";
                const oldPrice =
                  item.previousPrice || Math.round(item.currentPrice * 1.15);

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("ProductDetail", { product: item })
                    }
                  >
                    <Image
                      source={{ uri: item.images?.[0] || item.display_photo }}
                      style={styles.image}
                    />

                    <View style={styles.info}>
                      <Text style={styles.title}>{item.name}</Text>

                      {renderStars(item.rating || 0)}

                      <Text style={styles.description}>
                        {item.description && item.description.length > 14
                          ? item.description.slice(0, 14) + "..."
                          : item.description}
                      </Text>

                      {/* 💰 Prices */}
                      <View style={styles.priceRow}>
                        <Text style={styles.oldPrice}>Ksh {oldPrice}</Text>
                        <Text style={styles.newPrice}>Ksh {item.currentPrice}</Text>
                      </View>

                      {/* 📊 Stock Bar */}
                      <View style={styles.stockContainer}>
                        <View
                          style={[
                            styles.stockBar,
                            {
                              width: `${(stock / 50) * 100}%`,
                              backgroundColor: stockColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.stockText}>{stock} units left</Text>

                      {/* 🛍 Buttons */}
                      <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cartBtn}>
                          <Text style={styles.btnText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buyBtn}>
                          <Text style={styles.btnText}>Buy Now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#919397ff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    flex: 1,
  },
  bannerContainer: { marginBottom: 20 },
  bannerWrapper: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
  },
  shopNowBtn: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  shopNowText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  bannerImage: {
    width: width * 0.9,
    height: 180,
    marginHorizontal: width * 0.05,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 15,
    marginVertical: 10,
    color: "#333",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 8,
    padding: 10,
    width: width / 2 - 20,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  info: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 3,
  },
  description: {
    fontSize: 13,
    color: "#555",
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  oldPrice: {
    fontSize: 13,
    color: "red",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  newPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2a9d8f",
  },
  stockContainer: {
    height: 8,
    backgroundColor: "#a7a4a4ff",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
  },
  stockBar: {
    height: "100%",
    borderRadius: 10,
  
  },
  stockText: {
    fontSize: 12,
    color: "gray",
    marginVertical: 3,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  cartBtn: {
    flex: 1,
    backgroundColor: "#457b9d",
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#e63946",
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 13,
  },
});
