import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

export function SettingsScreen() {
  const [profile, setProfile] = useState({
    name: "Ian Shihundu",
    email: "ian@example.com",
    phone: "0712345678",
    altPhone: "0798765432",
    city: "Nairobi",
    town: "Westlands",
    street: "Peponi Road",
  });

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSave = () => {
    Alert.alert("Profile Updated", "Your profile information has been saved.");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account Deleted", "Your account has been removed.") },
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f7f7f7", padding: 16 }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 20, marginTop: 20, }}>
        Settings
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Edit Profile
        </Text>

        {[
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Phone", key: "phone" },
          { label: "Alternative Phone", key: "altPhone" },
          { label: "City", key: "city" },
          { label: "Town", key: "town" },
          { label: "Street (Delivery Address)", key: "street" },
        ].map((field) => (
          <View key={field.key} style={{ marginBottom: 15 }}>
            <Text style={{ marginBottom: 5, fontWeight: "500" }}>{field.label}</Text>
            <TextInput
              value={profile[field.key]}
              onChangeText={(text) => handleChange(field.key, text)}
              placeholder={`Enter ${field.label}`}
              style={{
                backgroundColor: "#f2f2f2",
                padding: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={{
          backgroundColor: "#e63946",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Delete Account</Text>
      </TouchableOpacity>
      <Text>Nairobi is Kenya’s capital city. In addition to its urban core, the city has Nairobi National Park, a large game reserve known for breeding endangered black rhinos and home to giraffes, zebras and lions. Next to it is a well-regarded elephant orphanage operated by the David Sheldrick Wildlife Trust. Nairobi is also often used as a jumping-off point for safari trips elsewhere in Kenya. ― Google
Neighborhoods: Donholm, Westlands, Kibera slum, Nairobi West · See more
Elevation: 1,795 m
Area code: 020
Demonym: Nairobian
Founded: 1899; 126 years ago
HDI (2022): 0.771high
Sub-counties: show List: Dagoretti; Embakasi; Lang'ata; Kamukunji; Kasarani; Kibra; Makadara; Mathare; Njiru; Starehe; Westlands
</Text>
    </ScrollView>
  );
}
