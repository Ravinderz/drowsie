import * as FileSystem from 'expo-file-system';

import React, { useEffect, useState } from 'react'
import {   SafeAreaView,
    FlatList,
    StyleSheet,
    Text,
    StatusBar, 
    TouchableOpacity} from 'react-native';

const FileManager = ({navigation}) => {

    const [files, setFiles] = useState([]);

    const dir = FileSystem.cacheDirectory + "Camera/";
    const checkIfExists = async () => {
      const dirInfo = await FileSystem.getInfoAsync(dir);
      if (dirInfo) {
        const temp = await FileSystem.readDirectoryAsync(dir);
        console.log(temp);
        setFiles([...temp]);
      }
    };

    useEffect(() => {
      checkIfExists();
    }, []);

    const onPress = (item) => {
      navigation.navigate('VideoPlayer',{uri: dir + item})
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={files}
          renderItem={({ item }) => (
            <TouchableOpacity
              title={item}
              style={styles.item}
              onPress={() => onPress(item)}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#9c1a4c',
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
    },
    text:{
        color: '#fff'
    }
  });

export default FileManager