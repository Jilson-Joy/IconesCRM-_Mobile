import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import logo from "../../assets/logo.png"; // Import the logo
import { login } from "../../api/loginApi";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const token = await login(email, password);

      if (token) {
        // Save the token in AsyncStorage
        await AsyncStorage.setItem("authToken", token);

        Alert.alert("Success", "Logged in successfully.");
        console.log("Login successful:", token);

        // Navigate to WebViewPage
        // navigation.navigate("WebView", { token });
        
      } else {
        Alert.alert("Error", "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        style={styles.buttonLogin} 
        onPress={handleLogin} 
        disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // Loading spinner
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 5,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "200",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 16,
    width: "100%",
    maxWidth: 400,
  },
  buttonLogin: {
    backgroundColor: "#1c6dbe",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  image: {
    width: "100%",
    maxWidth: 200,
    height: 110,
    aspectRatio: 1,
    resizeMode: "contain",
  },
});

export default Login;
