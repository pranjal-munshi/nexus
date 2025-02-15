


// import { useRouter, useLocalSearchParams } from "expo-router";
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

// export default function Payment() {
//   const { name } = useLocalSearchParams();
//   const [amount, setAmount] = useState("0");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleAmountChange = (value) => {
//     // Remove any non-numeric characters except the decimal
//     const sanitizedValue = value.replace(/[^0-9.]/g, "");
//     setAmount(sanitizedValue);
//   };

//   const handlePayment = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     setPaymentStatus("");

//     try {
//       const response = await fetch("https://d6cb-223-31-218-223.ngrok-free.app/api/pay", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromUserId: "Alice Johnson",
//           toUserId: name,
//           amount: parseFloat(amount),
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setPaymentStatus("Paid");
//         Alert.alert("Payment Successful", "Your payment has been processed successfully.");
//       } else {
//         setPaymentStatus("Failed");
//         Alert.alert("Payment Failed", result.message || "An error occurred during payment.");
//       }
//     } catch (error) {
//       setPaymentStatus("Failed");
//       Alert.alert("An error occurred during payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <View style={styles.avatarContainer}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>A</Text>
//           </View>
//           <Text style={styles.arrow}>➔</Text>
//           <View style={[styles.avatar, { backgroundColor: "#f57c00" }]}>
//             <Text style={styles.avatarText}>
//               {(Array.isArray(name) ? name[0] : name || "V").charAt(0).toUpperCase()}
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.paymentInfo}>Paying {name || "Unknown"}</Text>

//         {/* Editable label with currency symbol */}
//         <TextInput
//           style={styles.amountLabelInput}
//           keyboardType="numeric"
//           value={`₹${amount}`}
//           onChangeText={handleAmountChange}
//           placeholderTextColor="#000"
//           textAlign="center"
//         />

//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
//             <Text style={styles.payButtonText}>Proceed to Pay</Text>
//           </TouchableOpacity>
//         )}

//         {paymentStatus && (
//           <Text style={styles.paymentStatus}>{`Payment Status: ${paymentStatus}`}</Text>
//         )}

//         <TouchableOpacity style={styles.backButton} onPress={() => router.push("./scanner")}>
//           <Text style={styles.backButtonText}>Back to Scanner</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#f0f4ff",
//   },
//   avatarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#4caf50",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarText: {
//     color: "#ffffff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   arrow: {
//     fontSize: 24,
//     marginHorizontal: 16,
//   },
//   paymentInfo: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   amountLabelInput: {
//     fontSize: 36,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 16,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   payButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   payButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   paymentStatus: {
//     fontSize: 16,
//     color: "green",
//     marginTop: 16,
//     fontWeight: "bold",
//   },
//   backButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: "#ff1744",
//     width: "80%",
//     alignItems: "center",
//   },
//   backButtonText: {
//     color: "#ffffff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Payment() {
  const { name } = useLocalSearchParams();
  const [amount, setAmount] = useState("0");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAmountChange = (value) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setAmount(sanitizedValue);
  };

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setPaymentStatus("");

    try {
      const response = await fetch("https://d6cb-223-31-218-223.ngrok-free.app/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromUserId: "Alice Johnson",
          toUserId: name,
          amount: parseFloat(amount),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setPaymentStatus("Paid");
        Alert.alert("Payment Successful", "Your payment has been processed successfully.");
      } else {
        setPaymentStatus("Failed");
        Alert.alert("Payment Failed", result.message || "An error occurred during payment.");
      }
    } catch (error) {
      setPaymentStatus("Failed");
      Alert.alert("An error occurred during payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.arrow}>➔</Text>
          <View style={[styles.avatar, { backgroundColor: "#f57c00" }]}>
            <Text style={styles.avatarText}>
              {(Array.isArray(name) ? name[0] : name || "V").charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.paymentInfo}>Paying {name || "Unknown"}</Text>

        <TextInput
          style={styles.amountLabelInput}
          keyboardType="numeric"
          value={`₹${amount}`}
          onChangeText={handleAmountChange}
          placeholderTextColor="#000"
          textAlign="center"
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        )}

        {paymentStatus && (
          <Text style={styles.paymentStatus}>{`Payment Status: ${paymentStatus}`}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f4ff",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 50,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 28,
    marginHorizontal: 16,
  },
  paymentInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  amountLabelInput: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  payButton: {
    backgroundColor: "#007bff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 32,
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentStatus: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});
