import React from 'react'
import { Button, Text, View } from 'react-native'

const LandingScreen = ({navigation}) => {
  return (
    <View>
    <Text>Navigation to other screens</Text>
    <Button title="Video Gallary"  onPress={() => navigation.navigate('VideoGalleryScreen')} />
    <Button title="Video Player" onPress={() => navigation.navigate('VideoPlayerScreen')} />
    <Button title="File Manager" onPress={() => navigation.navigate('FileManager')} />
    </View>
  )
}

export default LandingScreen