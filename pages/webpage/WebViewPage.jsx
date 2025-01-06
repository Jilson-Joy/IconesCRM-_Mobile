import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
 
const WebViewPage = ({ route }) => {
  const { token } = route.params; 
const dashboardUrl = `https://www.youtube.com/`; // Append the token to the URL
 
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