import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Top Section with Image */}
      <View style={styles.topSection}>
        <Image source={require("./assets/Untitled.png")} style={styles.image} />
      </View>

      {/* Bottom Section with Text and Button */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Manage Your Finances</Text>
        <Text style={styles.subtitle}>
          Take control of your financial future with our app.
        </Text>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={() => router.push("/login")}>
          <Text style={styles.startButtonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  image: {
    width: 800,
    height: 350,
    resizeMode: "contain",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#7B3FFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
