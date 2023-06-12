import { Video,ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as React from 'react';
import { Button, Text, View, StyleSheet} from 'react-native'

export default VideoPlayer = ({route}) => {

    const {uri} = route.params;
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    video: {
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 25,
      width: '100%',
      height: '80%',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
