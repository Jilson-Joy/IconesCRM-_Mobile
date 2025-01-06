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
  Linking,
} from "react-native";
import logo from "../../assets/logo.png"; // Import the logo
// import { login } from "../../api/loginApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     Alert.alert("Error", "Please enter both email and password.");
  //     return;
  //   }

  //   // Show success alert with link option
  //   Alert.alert(
  //     "Success",
  //     "Logged in successfully.",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("User canceled the action"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Go to BuyMeACoffee",
  //         onPress: async () => {
  //           try {
  //             // Open the link in the default browser
  //             await Linking.openURL("https://buymeacoffee.com/sangammukh6");
  //           } catch (err) {
  //             console.error("Failed to open link", err);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );

  //   console.log("Login successful");
  // };
  const handleLogin =async () => {
    try {
        if (!email || !password) {
          Alert.alert("Error", "Please enter both email and password.");
          return;
        }
      const response = await login(email, password);
      if(response.success){
        Alert.alert("Success", "Logged in successfully.");
         console.log("Login successful:", response);
      }
      else{
        Alert.alert("Error", "Login failed. Please check your credentials.");
        console.log("Login failed:", response);
      }
    } catch (error) {
      console.log(error);
       console.error("Login error:", error);
       Alert.alert("Error", "An error occurred. Please try again later.");
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
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
    // fontSize: width > 400 ? 24 : 20,
    fontSize: 30,
    fontWeight: 500,
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
    fontWeight: 200,
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
