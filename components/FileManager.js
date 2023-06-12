import * as FileSystem from 'expo-file-system';

import React, { useEffect, useState } from 'react'
import {   SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar, 
    Button,
    TouchableOpacity} from 'react-native';

const FileManager = () => {

    const [files, setFiles] = useState([]);



    const dir = FileSystem.cacheDirectory + 'Camera/';
    const checkIfExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if(dirInfo){
            const temp = await FileSystem.readDirectoryAsync(dir);
            console.log(temp);
            setFiles([...temp])
        }
    } 

    useEffect(() => {
        checkIfExists();
      },[]);

      const onPress = (item) => {
        console.log(item);
      }
    
  return (

    

    <SafeAreaView style={styles.container}>
      <FlatList
        data={files}
        renderItem={({item}) => <TouchableOpacity title={item} style={styles.item} onPress={() => onPress(item)}>
            <Text style={styles.text}>{item}</Text></TouchableOpacity>}
        keyExtractor={item => item}
      />
    </SafeAreaView>

  )
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