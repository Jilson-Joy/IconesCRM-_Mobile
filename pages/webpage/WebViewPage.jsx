import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
 
const WebViewPage = ({ route }) => {
  const { token } = route.params; // Get the token from the navigation params
const dashboardUrl = `https://dev.iconesequipments.org/salesdashboard=${token}`; // Append the token to the URL
 
  return (
    <View style={styles.container}>
      <WebView source={{ uri: dashboardUrl }} />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
export default WebViewPage;