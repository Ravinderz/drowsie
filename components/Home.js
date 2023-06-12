import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoGalleryScreen from './VideoGalleryScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import LandingScreen from './LandingScreen';
import FileManager from './FileManager';


const Stack = createNativeStackNavigator();
  

const Home = () => (
    
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="VideoGalleryScreen" component={VideoGalleryScreen} />
      <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
      <Stack.Screen name="FileManager" component={FileManager} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Home;
