import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as tf from '@tensorflow/tfjs';

const modelJson = require('../assets/model/model.json');
const modelweight = require('../assets/model/group1-shard1of1.bin');


const TFModel = () => {
    const [model, setModel] = useState(null);

    useEffect(() => {
      const loadModel = async () => {
        await tf.ready();
        const model = await tf.loadLayersModel('file:///assets/model/model.json');
        console.log(model);
      };
  
      loadModel();
    }, []);

    return (
        <View>
          <Text>TensorFlow.js in React Native Expo</Text>
        </View>
      );
}

export default TFModel