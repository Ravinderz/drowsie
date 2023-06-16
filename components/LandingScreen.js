import React from 'react'
import { Button, Text, View } from 'react-native'
import TFModel from './TFModel'

const LandingScreen = ({navigation}) => {
  return (
    <View>

    <TFModel />

    <Text>Navigation to other screens</Text>
    <Button title="Video Gallary"  onPress={() => navigation.navigate('VideoGalleryScreen')} />
    <Button title="Video Recorder" onPress={() => navigation.navigate('VideoRecorder')} />
    <Button title="File Manager" onPress={() => navigation.navigate('FileManager')} />
    </View>
  )
}

export default LandingScreen