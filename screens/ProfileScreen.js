import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Notebook,
  SealQuestion,
  ShoppingCart,
  User,
  AirplaneTilt,
  Heart,
  CaretRight,
} from "phosphor-react-native";

export function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 👤 Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://picsum.photos/200/200" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      {/* 📊 Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Orders </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Cart</Text>
        </View>
      </View>

      {/* ⚙️ Options List */}
      <View style={styles.menu}>
        <MenuItem
          icon={<Notebook size={28} color="#333" weight="bold" />}
          label="My Orders"
          onPress={() => navigation.navigate("Orders")}
        />
        <MenuItem
          icon={<ShoppingCart size={28} color="#333" weight="bold" />}
          label="My Cart"
          onPress={() => navigation.navigate("Cart")}
        />
        <MenuItem
          icon={<Heart size={28} color="#333" weight="bold" />}
          label="Wishlist"
          onPress={() => navigation.navigate("Wishlist")}
        />
        <MenuItem
          icon={<SealQuestion size={28} color="#333" weight="bold" />}
          label="Settings"
          onPress={() => navigation.navigate("Settings")}
        />
        <MenuItem
          icon={<AirplaneTilt size={28} color="#e63946" weight="bold" />}
          label="Logout"
          color="#e63946"
          onPress={() => {
            // Clear user session
            navigation.replace("Login");
          }}
        />
      </View>
      <View style={styles.texting}>
      <Text>Nairobi is Kenya’s capital city. In addition to its urban core, the city has Nairobi National Park, a large game reserve known for breeding endangered black rhinos and home to giraffes, zebras and lions. Next to it is a well-regarded elephant orphanage operated by the David Sheldrick Wildlife Trust. Nairobi is also often used as a jumping-off point for safari trips elsewhere in Kenya. ― Google</Text>
    </View>
    </ScrollView>
  );
}

// 🔹 Reusable Menu Item Component (now using Phosphor icons)
const MenuItem = ({ icon, label, onPress, color = "#000" }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={[styles.menuLabel, { color }]}>{label}</Text>
    <CaretRight size={20} color="gray" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: -20,
    elevation: 2,
  },
  statBox: {
    alignItems: "center",
  },
  texting :{
      padding: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e63946",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  menu: {
    marginTop: 20,
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 10,
    elevation: 2,
    padding: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },
});
