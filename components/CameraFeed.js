import { AutoFocus, Camera,CameraType, VideoQuality } from 'expo-camera';
import { Permissions } from 'expo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';


const CameraFeed = () => {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [recordingCount, setRecordingCount] = useState(0);

  const requestForPermissions = () => {
    console.log('calling for permission request');
    requestPermission();
    requestAudioPermission();
  }
  
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted && !audioPermission?.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestForPermissions} title="grant permission" />
      </View>
    );
  }


  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  cameraReadyHandler = () => {
    console.log("preview is loaded");
  }

  stopRecording = async () => {
    setIsRecording(false);
    let val = await cameraRef.stopRecording();
    console.log(val);
  }

  startRecording = async () => {
    setIsRecording(true);
    let val = await cameraRef.recordAsync({maxDuration: 3,mute: true, quality: VideoQuality['720p']});
    if(val?.uri && recordingCount < 10){
      setRecordingCount(recordingCount+1);
      setRecordings([...recordings,val]);
      startRecording();
    }else{
      setIsRecording(false);
      let val = await cameraRef.stopRecording();
      console.log(val);
      console.log(recordings);
    }
  }

  return (
    <View style={styles.container}>
    <Camera style={styles.camera} type={type} 
      ratio='16:9'
      autoFocus={AutoFocus.auto}
      onCameraReady={cameraReadyHandler} 
      ref={(ref)=>setCameraRef(ref)}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        {!isRecording ? 
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Text style={styles.text}>start recording</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={styles.button} onPress={stopRecording}>
          <Text style={styles.text}>stop recording</Text>
        </TouchableOpacity> }
      </View>
    </Camera>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraFeed