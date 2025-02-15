import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      {/* Image Illustration */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/image.jpg")} style={styles.illustration} />
      </View>

      {/* Text */}
      <Text style={styles.text}>Best way to manage your money!</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("./login/signup")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("./login/SignIn")}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 50, // Adjust top spacing
    left: -15, // Align to left
  },
  logo: {
    width: 120, // Adjust size
    height: 65,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20, // Space between image and text
    marginBottom: 30, // Space between text and buttons
  },
  buttonContainer: {
    width: "80%", // Adjust width for alignment
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8A2BE2", // Purple color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 15, // Space between buttons
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
