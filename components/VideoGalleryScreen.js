import { Text, View, Button } from "react-native"

const VideoGalleryScreen = ({navigation}) => {
  return (
    <View>
    <Text>VideoGallery</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default VideoGalleryScreen