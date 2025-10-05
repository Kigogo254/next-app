import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 🧠 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://eco-backend-lime.vercel.app/api/products");
        setProducts(res.data);

        const imageUrls = res.data.map(
          (p) => p.images?.[0] || p.display_photo
        );

        await Promise.all(
          imageUrls.map(
            (url) =>
              new Promise((resolve) => {
                const img = Image.prefetch(url);
                resolve(img);
              })
          )
        );
        setImagesLoaded(true);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🌀 Banner auto-slide
  const bannerImages = [
    "https://picsum.photos/id/1018/600/300",
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1019/600/300",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndex + 1) % bannerImages.length;
      scrollRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setBannerIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerIndex]);

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
    return <View style={{ flexDirection: "row", marginVertical: 3 }}>{stars}</View>;
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !imagesLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={{ marginTop: 10, color: "#444" }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7", marginTop:20 }}>
      {/* 🔍 Fixed search bar */}
      <View style={{ flexDirection: "row", margin: 15, marginTop: 25, padding: 10, backgroundColor: "#fff", borderRadius: 10, elevation: 3 }}>
        <MagnifyingGlass size={28} color="#333" weight="bold" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ flex: 1 }}
        />
      </View>

      {/* 🖼 Fixed banner with margin and radius */}
      <View style={{ height: 200, marginHorizontal: 15, marginBottom: 10 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {bannerImages.map((img, index) => (
            <View key={index} style={{ width, alignItems: "center", justifyContent: "center" }}>
              <Image
                source={{ uri: img }}
                style={{
                  width: width * 0.9,
                  height: 180,
                  borderRadius: 20,
                  marginHorizontal: width * 0.05,
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 25,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 25,
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 🛍 Scrollable product list only */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", margin: 15 }}>🛍️ Products</Text>

        {filteredProducts.length === 0 ? (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>No products found</Text>
        ) : (
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {filteredProducts.map((item, index) => {
              const stock = item.countInStock || 0;
              const stockColor = stock < 20 ? "red" : stock <= 35 ? "blue" : "green";
              const oldPrice = item.previousPrice || Math.round(item.currentPrice * 1.15);

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    margin: 8,
                    padding: 10,
                    width: width / 2 - 20,
                    elevation: 3,
                  }}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("ProductDetail", { product: item })}
                >
                  <Image
                    source={{ uri: item.images?.[0] || item.display_photo }}
                    style={{ width: "100%", height: 150, borderRadius: 10 }}
                  />

                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#333" }}>{item.name}</Text>
                    {renderStars(item.rating || 0)}
                    <Text style={{ fontSize: 13, color: "#555" }}>
                      {item.description && item.description.length > 14
                        ? item.description.slice(0, 14) + "..."
                        : item.description}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                      <Text style={{ fontSize: 13, color: "red", textDecorationLine: "line-through", marginRight: 6 }}>
                        Ksh {oldPrice}
                      </Text>
                      <Text style={{ fontSize: 15, fontWeight: "700", color: "#2a9d8f" }}>
                        Ksh {item.currentPrice}
                      </Text>
                    </View>

                    <View style={{ height: 8, backgroundColor: "#ccc", borderRadius: 10, overflow: "hidden", marginTop: 5 }}>
                      <View
                        style={{
                          height: "100%",
                          width: `${(stock / 50) * 100}%`,
                          backgroundColor: stockColor,
                        }}
                      />
                    </View>
                    <Text style={{ fontSize: 12, color: "gray", marginVertical: 3 }}>{stock} units left</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                      <TouchableOpacity style={{ flex: 1, backgroundColor: "#457b9d", paddingVertical: 8, borderRadius: 8, marginRight: 5 }}>
                        <Text style={{ color: "#fff", fontWeight: "600", textAlign: "center", fontSize: 13 }}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1, backgroundColor: "#e63946", paddingVertical: 8, borderRadius: 8, marginLeft: 5 }}>
                        <Text style={{ color: "#fff", fontWeight: "600", textAlign: "center", fontSize: 13 }}>
                          Buy Now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
