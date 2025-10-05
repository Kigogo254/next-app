import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DUMMY_ORDERS = [
  {
    id: "1",
    item: "Wireless Headphones",
    status: "Processing",
    orderedAt: "2025-10-03 09:15 AM",
    cost: "$120",
  },
  {
    id: "2",
    item: "Bluetooth Speaker",
    status: "Delivered",
    orderedAt: "2025-09-30 11:00 AM",
    shippedAt: "2025-10-01 10:00 AM",
    deliveredAt: "2025-10-02 02:30 PM",
    cost: "$80",
  },
  {
    id: "3",
    item: "Phone Charger",
    status: "Shipped",
    orderedAt: "2025-10-04 08:45 AM",
    shippedAt: "2025-10-04 02:00 PM",
    cost: "$25",
  },
  {
    id: "4",
    item: "Smartwatch",
    status: "Canceled",
    orderedAt: "2025-10-02 01:00 PM",
    canceledAt: "2025-10-02 05:00 PM",
    cost: "$150",
  },
  {
    id: "5",
    item: "Gaming Mouse",
    status: "Processing",
    orderedAt: "2025-10-05 09:00 AM",
    cost: "$45",
  },
  {
    id: "6",
    item: "Laptop Stand",
    status: "Delivered",
    orderedAt: "2025-09-29 10:15 AM",
    shippedAt: "2025-09-30 09:00 AM",
    deliveredAt: "2025-10-01 03:30 PM",
    cost: "$60",
  },
  {
    id: "7",
    item: "Mechanical Keyboard",
    status: "Shipped",
    orderedAt: "2025-10-03 07:30 AM",
    shippedAt: "2025-10-03 04:00 PM",
    cost: "$100",
  },
  {
    id: "8",
    item: "USB-C Hub",
    status: "Canceled",
    orderedAt: "2025-10-01 11:20 AM",
    canceledAt: "2025-10-01 01:00 PM",
    cost: "$35",
  },
];

const statusColors = {
  Processing: "lightgreen",
  Delivered: "yellowgreen",
  Shipped: "skyblue",
  Canceled: "tomato",
};

export function OrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredOrders =
    selectedStatus === "All"
      ? DUMMY_ORDERS
      : DUMMY_ORDERS.filter((order) => order.status === selectedStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      {/* 🔹 Filter Buttons */}
      <View style={styles.filterRow}>
        {["All", "Processing", "Delivered", "Shipped", "Canceled"].map(
          (status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedStatus === status
                      ? statusColors[status] || "#ccc"
                      : "#f0f0f0",
                  borderColor: statusColors[status] || "#ccc",
                },
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: selectedStatus === status ? "#000" : "#555",
                    fontWeight: selectedStatus === status ? "700" : "500",
                  },
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* 🔹 Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.orderCard,
              { backgroundColor: statusColors[item.status] },
            ]}
          >
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.statusText}>Status: {item.status}</Text>

            <View style={{ marginLeft: 10 }}>
              <Text>🕒 Ordered: {item.orderedAt}</Text>
              {item.shippedAt && <Text>📦 Shipped: {item.shippedAt}</Text>}
              {item.deliveredAt && <Text>✅ Delivered: {item.deliveredAt}</Text>}
              {item.canceledAt && <Text>❌ Canceled: {item.canceledAt}</Text>}
              <Text style={{ fontWeight: "bold", marginTop: 5 }}>
                💰 Cost: {item.cost}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
  },
  orderCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  itemName: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
});
