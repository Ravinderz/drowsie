import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CameraFeed from './components/CameraFeed';
import Home from './components/Home';

export default function App() {
  return (
      <Home/>
      // <CameraFeed />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
