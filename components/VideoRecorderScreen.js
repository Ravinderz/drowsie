import React from 'react'
import { Text,View, Button, StyleSheet } from 'react-native'
import CameraFeed from './CameraFeed';


const VideoRecorder = ({navigation}) => {
  return (
    <View style={styles.container}>
    <CameraFeed />
    <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

  
});

export default VideoRecorder;