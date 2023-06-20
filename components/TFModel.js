import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import * as tf from '@tensorflow/tfjs';

const modelJson = require('../assets/model/model.json');
const modelweight = require('../assets/model/group1-shard1of1.bin');

import { Camera } from 'expo-camera';

import {
  bundleResourceIO,
  cameraWithTensors,
} from '@tensorflow/tfjs-react-native';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { CameraType } from 'expo-camera/build/Camera.types';

// tslint:disable-next-line: variable-name
const TensorCamera = cameraWithTensors(Camera);
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (3 / 4);

// The score threshold for pose detection results.
const MIN_KEYPOINT_SCORE = 0.3;

// The size of the resized output from TensorCamera.
//
// For movenet, the size here doesn't matter too much because the model will
// preprocess the input (crop, resize, etc). For best result, use the size that
// doesn't distort the image.
const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (3 / 4);

// Whether to auto-render TensorCamera preview.
const AUTO_RENDER = false;



const TFModel = () => {
    const [model, setModel] = useState(null);
    const cameraRef = useRef(null);
    const [tfReady, setTfReady] = useState(false);
    const [fps, setFps] = useState(0);
   //const [permission, setPermission] = useState(null)//Camera.useCameraPermissions();
   //const [audioPermission, setAudioPermission] = useState(null)//Camera.useMicrophonePermissions();
    const [cameraType, setCameraType] = useState(
        Camera.Constants.Type.front
      );

      const rafId = useRef(null);

    //   const requestForPermissions = async () => {
    //     console.log('calling for permission request');
    //     const per = await Camera.requestCameraPermissionsAsync();
    //     const audioPer = await Camera.requestMicrophonePermissionsAsync();
    //     setPermission(per);
    //     setAudioPermission(audioPer);
    //   }
      
    //   if (!permission) {
    //     // Camera permissions are still loading
    //     return <View />;
    //   }
    
    //   if (!permission.granted && !audioPermission?.granted) {
    //     // Camera permissions are not granted yet
    //     return (
    //       <View style={styles.container}>
    //         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    //         <Button onPress={requestForPermissions} title="grant permission" />
    //       </View>
    //     );
    //   }

      useEffect(() => {
        async function prepare() {
        
          rafId.current = null;
          // Wait for tfjs to initialize the backend.
          await tf.ready();
          console.log("awaiting for permisson")
         // await requestForPermissions();
    
            // const model = await tf.loadLayersModel(bundleResourceIO'https://ravinderz.github.io/drowsie/assets/model/model.json');
            const model = await tf.loadLayersModel(bundleResourceIO(modelJson,modelweight));
            // console.log(model);
            console.log(model.summary())
            // model.predict();
            setModel(model);
            //requestForPermissions();
          // Ready!
          setTfReady(true);
        }
    
        prepare();
      }, []);

      const handleCameraStream = async (
        images,
        updatePreview,
        gl
      ) => {
        const loop = async () => {
          // Get the tensor and run pose detection.
          const imageTensor = images.next().value;
            console.log(imageTensor);
           const img = imageTensor.expandDims(1);
            console.log(imageTensor);
          const startTs = Date.now();
          const latency = Date.now() - startTs;
          setFps(Math.floor(1000 / latency));
          console.log('Prediction from loaded model:');
          model.predict(img).print();
         
          
          tf.dispose([imageTensor]);
    
          if (rafId.current === 0) {
            return;
          }
    
          // Render camera preview manually when autorender=false.
          if (!AUTO_RENDER) {
            updatePreview();
            gl.endFrameEXP();
          }
    
          rafId.current = requestAnimationFrame(loop);
        };
    
        loop();
      };
    
      const renderFps = () => {
        return (
          <View style={styles.fpsContainer}>
            <Text>FPS: {fps}</Text>
          </View>
        );
      };
    
      const renderCameraTypeSwitcher = () => {
        return (
          <View
            style={styles.cameraTypeSwitcher}
            onTouchEnd={handleSwitchCameraType}
          >
            <Text>
              Switch to{' '}
              {cameraType === Camera.Constants.Type.front ? 'back' : 'front'} camera
            </Text>
          </View>
        );
      };
    
      const handleSwitchCameraType = () => {
        if (cameraType === Camera.Constants.Type.front) {
          setCameraType(Camera.Constants.Type.back);
        } else {
          setCameraType(Camera.Constants.Type.front);
        }
      };
    
      const getOutputTensorWidth = () => {
        // On iOS landscape mode, switch width and height of the output tensor to
        // get better result. Without this, the image stored in the output tensor
        // would be stretched too much.
        //
        // Same for getOutputTensorHeight below.
        return OUTPUT_TENSOR_WIDTH;
      };
    
      const getOutputTensorHeight = () => {
        return OUTPUT_TENSOR_HEIGHT;
      };
    
      const getTextureRotationAngleInDegrees = () => {
        // On Android, the camera texture will rotate behind the scene as the phone
        // changes orientation, so we don't need to rotate it in TensorCamera.
          return 0;
      };
    
      if (!tfReady) {
        return (
          <View style={styles.loadingMsg}>
            <Text>Loading...</Text>
          </View>
        );
      } else {
        return (
          // Note that you don't need to specify `cameraTextureWidth` and
          // `cameraTextureHeight` prop in `TensorCamera` below.
          <View
            style={
              styles.containerLandscape
            }
          >
            <TensorCamera
              ref={cameraRef}
              style={styles.camera}
              autorender={AUTO_RENDER}
              type={cameraType}
              // tensor related props
              resizeWidth={getOutputTensorWidth()}
              resizeHeight={getOutputTensorHeight()}
              resizeDepth={3}
              onReady={handleCameraStream}
            />
            {renderFps()}
            {renderCameraTypeSwitcher()}
          </View>
        );
      }
    }

const styles = StyleSheet.create({
    containerPortrait: {
      position: 'relative',
      width: CAM_PREVIEW_WIDTH,
      height: CAM_PREVIEW_HEIGHT,
      marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
    },
    containerLandscape: {
      position: 'relative',
      width: CAM_PREVIEW_HEIGHT,
      height: CAM_PREVIEW_WIDTH,
    },
    loadingMsg: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    svg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 30,
    },
    fpsContainer: {
      position: 'absolute',
      top: 10,
      left: 10,
      width: 80,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .7)',
      borderRadius: 2,
      padding: 8,
      zIndex: 20,
    },
    cameraTypeSwitcher: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 180,
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .7)',
      borderRadius: 2,
      padding: 8,
      zIndex: 20,
    },
  });

export default TFModel