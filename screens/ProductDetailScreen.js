import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Star } from "phosphor-react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

export function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [mainImage, setMainImage] = useState(product.images?.[0]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get("http://10.132.72.106:5000/api/products");
        setRelated(res.data.filter((p) => p._id !== product._id));
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };
    fetchRelated();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          color={i <= rating ? "#FFD700" : "#ccc"}
          weight={i <= rating ? "fill" : "regular"}
        />
      );
    }
    return <View style={{ flexDirection: "row", marginVertical: 4 }}>{stars}</View>;
  };

  const stockColor =
    product.countInStock < 20
      ? "red"
      : product.countInStock <= 35
      ? "#2196F3"
      : "green";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text>We knew you like ,{product.name}, Go ahead and purchase one!!!</Text>
        {/* 🖼 Main Image */}
        <Image source={{ uri: mainImage }} style={styles.mainImage} />

        {/* 🖼 Thumbnail Selector */}
        <FlatList
          data={product.images || []}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.thumbContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setMainImage(item)}>
              <Image
                source={{ uri: item }}
                style={[
                  styles.thumbImage,
                  item === mainImage && { borderColor: "red", borderWidth: 2 },
                ]}
              />
            </TouchableOpacity>
          )}
        />

        {/* 📄 Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          {renderStars(product.rating)}

          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>Ksh {product.previousPrice}</Text>
            <Text style={styles.newPrice}>Ksh {product.currentPrice}</Text>
          </View>

          {/* 📊 Stock Bar */}
          <View style={styles.stockContainer}>
            <View
              style={[
                styles.stockBar,
                {
                  width: `${(product.countInStock / 50) * 100}%`,
                  backgroundColor: stockColor,
                },
              ]}
            />
          </View>
          <Text style={styles.stockText}>{product.countInStock} units left</Text>

          {/* 📝 Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* 🛍 Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cartBtn}>
              <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.buyText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🛒 Related Products */}
        {related.length > 0 && (
          <>
            <Text style={styles.relatedTitle}>🛍 Related Products</Text>
            <View style={styles.relatedGrid}>
              {related.slice(0, 4).map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.relatedCard}
                  onPress={() => navigation.push("ProductDetail", { product: item })}
                >
                  <Image
                    source={{ uri: item.images?.[0] }}
                    style={styles.relatedImage}
                  />
                  <Text numberOfLines={1} style={styles.relatedName}>
                    {item.name}
                  </Text>
                  <Text style={styles.relatedPrice}>Ksh {item.currentPrice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#c4c0c0ff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  mainImage: {
    width: "100%",
    height: 300,
    marginTop:20,
    borderRadius: 10,
    resizeMode: "cover",
  },
  thumbContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    width : "100%",
    borderColor: "#2196F3",
    borderRadius: 10,
    padding: 5,
  },
  thumbImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  infoContainer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "red",
    fontSize: 16,
    marginRight: 10,
  },
  newPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  stockContainer: {
    height: 8,
    backgroundColor:  "#a7a4a4ff",
    borderRadius: 10,
    marginVertical: 6,
    overflow: "hidden",
  },
  stockBar: {
    height: "100%",
    borderRadius: 10,
  },
  stockText: {
    fontSize: 13,
    color: "gray",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginVertical: 10,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cartBtn: {
    flex: 1,
    backgroundColor: "#555",
    paddingVertical: 12,
     paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 3,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 3,
  },
  cartText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  buyText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 15,
    marginVertical: 10,
  },
  relatedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  relatedCard: {
    backgroundColor: "#fff",
    width: 150,
    margin: 8,
    borderRadius: 10,
    padding: 2,
    alignItems: "center",
    elevation: 3,
  },
  relatedImage: {
    width: 100,
    height: 130,
    borderRadius: 10,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 4,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "green",
  },
});
