import React, { useState } from "react";
import { 
  View, Text, Image, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert 
} from "react-native";

import { useRouter } from "expo-router";

const SignUpScreen = ({ navigation }) => {
const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [amount,setAmount] = useState(1000);

  const handleSignUp = async () => {
    const userData = { name, email, dob, pin, password, amount };
  
    try {
      const response = await fetch("https://d6cb-223-31-218-223.ngrok-free.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response)
      const result = await response.json(); // Parse JSON response
  
      if (response.ok) {
        Alert.alert("Success", result.message || "Sign up successful!");
        router.push({ pathname: "/scanner", params: userData })
      } else {
        Alert.alert("Error", result.error || "Sign up failed");
      }
    } catch (error) {
        console.error(error);
         Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image source={require("../assets/in_up.jpg")} style={styles.illustration} />
        </View>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Full Name" 
            placeholderTextColor="gray"
            value={name} 
            onChangeText={setName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email} 
            onChangeText={setEmail} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Date of Birth (DD/MM/YYYY)" 
            placeholderTextColor="gray"
            value={dob} 
            onChangeText={setDob} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="PIN" 
            placeholderTextColor="gray"
            keyboardType="numeric"
            maxLength={6}
            value={pin} 
            onChangeText={setPin} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="gray"
            secureTextEntry
            value={password} 
            onChangeText={setPassword} 
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logoContainer: {
    alignSelf: "flex-start",
    marginLeft: 0, 
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 70,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  illustration: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
