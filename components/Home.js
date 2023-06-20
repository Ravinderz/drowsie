import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoGalleryScreen from './VideoGalleryScreen';
import LandingScreen from './LandingScreen';
import FileManager from './FileManager';
import VideoRecorder from './VideoRecorderScreen';
import VideoPlayer from './VideoPlayerScreen';
import TFModel from './TFModel';


const Stack = createNativeStackNavigator();
  

const Home = () => (
    
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Home' }}/>
      <Stack.Screen name="VideoGalleryScreen" component={VideoGalleryScreen} options={{ title: 'Video Gallary' }}/>
      <Stack.Screen name="VideoRecorder" component={VideoRecorder} options={{ title: 'Video Recorder' }}/>
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ title: 'Video Player' }}/>
      <Stack.Screen name="FileManager" component={FileManager} options={{ title: 'File Manager' }}/>
      <Stack.Screen name="TFModel" component={TFModel} options={{ title: 'TFModel' }}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default Home;
